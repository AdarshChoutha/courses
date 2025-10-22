'use strict';

const { threadController, replyController } = require('../controllers');

module.exports = function (app) {
  // Threads routes
  app.route('/api/threads/:board')
    .post(threadController.postThread)
    .get(threadController.getThread)
    .delete(threadController.deleteThread)
    .put(threadController.putThread);

  // Replies routes
  app.route('/api/replies/:board')
    .post(replyController.postReply)
    .get(replyController.getReply)
    .delete(replyController.deleteReply)
    .put(replyController.putReply);
};
