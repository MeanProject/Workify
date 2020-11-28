const express = require("express");
const router = express.Router();
const passport = require("passport");

const Project = require("../models/Project");
const MailSender = require('../mail')


// @route GET http://localhost:3000/projects
// @desc Get all projects for a specific user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let projectsArr = [];
    // Member projects

    await Project.find({})
      .then(projects => {
        projects.map(project => {
          project.teamMembers &&
            project.teamMembers.map(member => {
              if (member.email == req.user.email) {
                projectsArr.push(project);
              }
            });
        });
      })
      .catch(err => console.log(err));

    await Project.find({})
      .then(projects => {
        projects.map(project => {
              if (project.owner.email == req.user.email) {
                projectsArr.push(project);                
              }
            });
            res.json({projectArr: projectsArr, email: req.user.email});
      })
      .catch(err => console.log(err));
  }
);

// @route GET http://localhost:3000/projects/:id
// @desc Get specific project by id
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    Project.findById(id).then(project => res.json({'project':project, 'user':req.user}));
  }
);

// @route POST http://localhost:3000/projects/create
// @desc Create a new project
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    const NEW_PROJECT = await new Project({
      owner: OWNER,
      name: req.body.projectName,
      teamMembers: req.body.teamMembers,
    });

    NEW_PROJECT.save().
    then(
      project => {
        console.log("heyy")
        var msg = 'You\'re added to the project '+ project.name + ' by ' + project.owner.name
        for (let index = 0; index < NEW_PROJECT.teamMembers.length; index++) {
          console.log(index)
          let project_mail = new MailSender(project.teamMembers[index].email,'Project Assigned',msg)
          project_mail.send();
        }
        res.json({project,success: true, msg: 'New project created'})
      }
    )
    .catch(err => res.json({success: false, msg: 'Failed to create project!Try again'}));
  }
);

// @route PATCH http://localhost:3000/projects/update
// @desc Update an existing project
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let projectFields = {};
    projectFields.name = req.body.projectName;
    projectFields.teamMembers = req.body.teamMembers;
    console.log("ProjectFilelds");
    console.log(projectFields);
    Project.findById(req.body.id).then(project => {
      if(project.owner.email == req.user.email){
        project.update({ $set: projectFields },
          { new: true })
      .then(project => {
        console.log(project);
        res.json({project, success: true});
      }).catch(err => console.log(err));
    }
    else{
      res.json({project, success: false})
    }
  })
  }
);

// @route DELETE http://localhost:3000/projects/delete/:id
// @desc Delete an existing project
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params.id);
    Project.findById(req.params.id).then(project => {
      if(project.owner.email == req.user.email){
        project.remove().then(() => res.json({ success: true }));
      }
      else{
        res.json({success: false})
      }
    });
  }
);


module.exports = router;
