var SessionActions = require('./../actions/session_actions');
var ErrorActions = require('./../actions/error_actions');
var MessageActions = require('./../actions/message_actions');

var MessageApiUtil = {

  getAllConvos: function (theUserId, update) {
    $.ajax({
      method: 'GET',
      url: 'api/conversations',
      dataType: 'json',
      data: { conversation: theUserId },
      success: function (result) {
        MessageActions.receiveAllConvos(result);
        if (update) {update();}
      }
    });
  },

  getOneConvo: function (theConvoId) {
    $.ajax({
      method: 'GET',
      url: 'api/conversations/' + theConvoId,
      dataType: 'json',
      data: {},
      success: function (result) {
        MessageActions.receiveOneConvo(result);
      }
    });
  },

  createConversation: function (theParams, messageBody, callback) {
    $.ajax({
      method: 'POST',
      url: 'api/conversations',
      dataType: 'json',
      data: {conversation: theParams},
      success: function (newConvo) {
        MessageApiUtil.createMessage({
          convo_id: newConvo.id,
          sender_id: theParams.user_id,
          receiver_id: theParams.user2_id,
          body: messageBody
        });

        callback(newConvo.id);
      },
    });
  },

  createMessage: function (theParams) {
    $.ajax({
      method: 'POST',
      url: 'api/messages',
      dataType: 'json',
      data: {message: theParams},
      success: function (newMessage) {
        MessageActions.receiveNewMessage(newMessage);
      }
    });
  },

  updateMessage: function (message_id) {
    $.ajax({
      method: 'PUT',
      url: 'api/messages/' + message_id,
      dataType: 'json',
      data: { message: { unread: false } },
      success: function (newMessage) {
        MessageActions.receiveNewMessage(newMessage);
      }
    });
  }

};

module.exports = MessageApiUtil;
