const Message = require("../models/message").Message;

exports.postThread = async (req, res, next) => {
  try {
    let board = req.params.board;

    await Message.create({
      board: board,
      text: req.body.text,
      created_on: new Date(),
      bumped_on: new Date(),
      reported: false,
      delete_password: req.body.delete_password,
      replies: []
    });

    // respond with 200 so test harness (chai-http) does not follow redirects
    return res.status(200).send('success');
  } catch (err) {
    return res.status(500).send('error');
  }
};

exports.getThread = async (req, res) => {
  try {
    let board = req.params.board;
    const threadArray = await Message.find({ board: board })
      .sort({ bumped_on: -1 })
      .limit(10)
      .lean()
      .exec();

    // sanitize and trim replies
    const out = (threadArray || []).map(ele => {
      ele.replycount = (ele.replies || []).length;
      // sort replies by created_on desc and limit to 3
      ele.replies = (ele.replies || []).sort((a, b) => new Date(b.created_on) - new Date(a.created_on)).slice(0, 3);
      // remove sensitive fields
      delete ele.delete_password;
      delete ele.reported;
      ele.replies = ele.replies.map(r => {
        const copy = { ...r };
        delete copy.delete_password;
        delete copy.reported;
        return copy;
      });
      return ele;
    });

    return res.json(out);
  } catch (err) {
    return res.status(500).send('error');
  }
};

exports.deleteThread = async (req, res) => {
  try {
    let deletedThread = await Message.findById(req.body.thread_id);
    if (!deletedThread) return res.status(200).send('incorrect password');
    if (req.body.delete_password === deletedThread.delete_password) {
      await Message.findByIdAndDelete(req.body.thread_id);
      return res.status(200).send('success');
    } else {
      return res.status(200).send('incorrect password');
    }
  } catch (err) {
    res.status(500).send('error');
  }
};

exports.putThread = async (req, res) => {
  try {
    let updateThread = await Message.findById(req.body.thread_id);
    updateThread.reported = true;
    await updateThread.save();
    return res.status(200).send('reported');
  } catch (err) {
    res.status(500).send('error');
  }
};