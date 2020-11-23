const express = require("express");
const router = express.Router();
const passport = require("passport");

const Task = require("../models/Task");

// @route GET api/tasks/:id
// @desc Get tasks for specific project
// @access Private
router.get(
  "/project/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Task.find({ project: id }).then(tasks => res.json(tasks));
  }
);


// @route GET api/tasks/:id
// @desc Get specific task by id
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;
    Task.findById(id).then(task => res.json(task));
  }
);

// @route POST api/tasks/create
// @desc Create a new task
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const NEW_TASK = new Task({
      project: req.body.project,
      taskName: req.body.taskName,
      dateDue: req.body.dateDue,
      assignee: req.body.assignee
    });

    NEW_TASK.save()
      .then(task => res.json({project,success: true, msg: 'New task created'}))
      .catch(err => console.log({success: false, msg: 'try again'}));
  }
);

// @route POST api/tasks/delete
// @desc Delete an existing task
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findById(req.params.id).then(task => {
      task.remove().then(() => res.json({ success: true }));
    });
  }
);

// @route PATCH api/tasks/update
// @desc Update an existing task
// @access Private
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let taskFields = {};
    taskFields.taskName = req.body.taskName;
    if (req.body.dateDue && req.body.dateDue !== "Date undefined") {
      taskFields.dateDue = req.body.dateDue;
    }
    taskFields.assignee = req.body.assignee;
    console.log("1inside tasks.js updta"+req.body.id);
    Task.findOneAndUpdate(
      { _id: req.body._id },
      { $set: taskFields },
      { new: true }
    )
      .then(task => {
        console.log("inside tasks.js updta"+task);
        res.json({task,success: true, msg: 'task updated'});        
      })
      .catch(err => res.json({success: false, msg: 'task not updated'}));
  }
);

module.exports = router;
