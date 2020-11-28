const mongoose = require("mongoose");
const config = require('../config/database');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "projects",
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  taskDesc:{
    type: String,
    required:true
  },
  dueDate: {
    type: Date,
    required: true
  },
  assignee: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  isDone: {
    type:Boolean,
    default: false
  }
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
