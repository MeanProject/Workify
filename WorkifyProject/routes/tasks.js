const express = require("express");
const router = express.Router();
const passport = require("passport");

const Task = require("../models/Task");
const MailSender = require('../mail')


// @route GET http://localhost:3000/tasks/all
// @desc Get tasks for logged in assignee
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let email = req.user.email;
    let tasksArr = [];
    let allTasks=[];

    await Task.find({assignee:email}).then(tasks=>{
      tasksArr=tasks;
    });

    await Project.find({})
    .then(projects => {
      projects.map(project => {
        tasksArr.map(task=>{
          if (project._id.equals(task.project)) {
            allTasks.push({task:task,project:project});                
          }
        });    
      });
      res.json({allTasks: allTasks});
    })
    .catch(err => console.log(err));
  });


// @route GET http://localhost:3000/tasks/:id
// @desc Get specific task by id
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    Task.findById(id).then(task => res.json(task));
  }
);

// @route GET http://localhost:3000/tasks/project/:id
// @desc Get tasks of specific project
router.get(
  "/project/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Task.find({ project: id }).then(tasks => res.json(tasks));
  });

// @route POST http://localhost:3000/tasks/create
// @desc Create a new task
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const NEW_TASK = new Task({
      project: req.body.project,
      taskName: req.body.taskName,
      dueDate: req.body.taskDue,
      taskDesc: req.body.taskDesc,
      assignee: req.body.assignee
    });

    NEW_TASK.save()
      .then(task => {
        var msg = 'You\'ve been assigned the task: '+ NEW_TASK.taskName 
        let task_mail = new MailSender(NEW_TASK.assignee,'Task Assigned',msg)
        task_mail.send();
        res.json({NEW_TASK, success: true, msg: 'New task created'})}
        )
      .catch(err => console.log(err));
  }
);

// @route POST http://localhost:3000/tasks/delete
// @desc Delete an existing task
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findById(req.params.id).then(task => {
      task.remove().then(() => res.json({ success: true }));
    });
  }
);

// @route PATCH http://localhost:3000/tasks/update
// @desc Update an existing task
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("edit")
    let taskFields = {};
    taskFields.taskName = req.body.taskName;
    if (req.body.taskDue && req.body.taskDue !== "Date undefined") {
      taskFields.dueDate = req.body.taskDue;
    }
    taskFields.assignee = req.body.assignee;
    taskFields.taskDesc = req.body.taskDesc;
    Task.findOneAndUpdate(
      { _id: req.body._id },
      { $set: taskFields },
      { new: true }
    ).then(task => {
        res.json({task, success: true, msg: 'task updated'});        
      })
      .catch(err => res.json({success: false, msg: 'task not updated'}));
  }
);

// @route PATCH http://localhost:3000/tasks/check
// @desc mark existing task as done or not done
router.patch(
  "/check",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let taskFields = {};
    taskFields.isDone = req.body.isDone;
    console.log(req.body._id);
    Task.findOneAndUpdate(
      { _id: req.body._id },
      { $set: taskFields },
      { new: true }
    ).then(task => {
        res.json({task, success: true, msg: 'task completed'});        
      })
      .catch(err => res.json({success: false, msg: 'something went wrong'}));
  }
);

module.exports = router;
