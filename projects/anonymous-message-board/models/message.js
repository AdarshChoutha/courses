const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  board: String,
  text: String,
  created_on: Date,
  bumped_on: Date,
  reported: Boolean,
  delete_password: String,
  replies: [
    {
      text: String,
      created_on: Date,
      delete_password: String,
      reported: Boolean
    }
  ]
});

const Message = mongoose.model("message", messageSchema);

exports.Message = Message;