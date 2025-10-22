let mongoose = require("mongoose");
let Message = require("../models/message").Message;

exports.postReply = async (req, res, next) => {
  try {
    let foundBoard = await Message.findById(req.body.thread_id);
    if (!foundBoard) return res.status(404).send('not found');
    // update bumped_on to now
    foundBoard.bumped_on = new Date();
    foundBoard.replies.push({
      _id: new mongoose.Types.ObjectId(),
      text: req.body.text,
      created_on: new Date(),
      delete_password: req.body.delete_password,
      reported: false
    });

    await foundBoard.save();
    // Return success instead of redirect so tests don't try to follow redirects
    return res.status(200).send('success');
  } catch (err) {
    res.status(500).send('error');
  }
};

exports.getReply = async (req, res) => {
  try {
    const thread = await Message.findById(req.query.thread_id).lean().exec();
    if (!thread) return res.status(404).send('not found');
    delete thread.delete_password;
    delete thread.reported;
    thread.replycount = (thread.replies || []).length;
    thread.replies = (thread.replies || []).map(r => {
      const copy = { ...r };
      delete copy.delete_password;
      delete copy.reported;
      return copy;
    });
    return res.json(thread);
  } catch (err) {
    res.status(500).send('error');
  }
};

exports.deleteReply = async (req, res) => {
  try {
    let foundThread = await Message.findById(req.body.thread_id);
    if (!foundThread) return res.status(200).send('incorrect password');
    const reply = foundThread.replies.id(req.body.reply_id);
    if (!reply) return res.status(200).send('incorrect password');
    if (reply.delete_password !== req.body.delete_password) return res.status(200).send('incorrect password');
    reply.text = '[deleted]';
    await foundThread.save();
    return res.status(200).send('success');
  } catch (err) {
    res.status(500).send('error');
  }
};

exports.putReply = async (req, res) => {
  try {
    let foundThread = await Message.findById(req.body.thread_id);
    if (!foundThread) return res.status(404).send('not found');
    const reply = foundThread.replies.id(req.body.reply_id);
    if (!reply) return res.status(404).send('not found');
    reply.reported = true;
    await foundThread.save();
    return res.status(200).send('reported');
  } catch (err) {
    res.status(500).send('error');
  }
};