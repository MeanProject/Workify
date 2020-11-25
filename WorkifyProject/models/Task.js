const mongoose = require("mongoose");
const config = require('../config/database');
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "projects",
    required: true,
  },
  taskName: {
    type: String,
    required: true
  },
  dateDue: {
    type: Date
  },
  assignee: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
    description:{
      type:String
    },
      isDone:{
        type:Boolean,
        required:true
      }
});

module.exports = Task = mongoose.model("tasks", TaskSchema);
