var SessionActions = require('./../actions/session_actions');
var ErrorActions = require('./../actions/error_actions');
var MessageActions = require('./../actions/message_actions');

var MessageApiUtil = {

  getAllConvos: function (theUserId) {
    $.ajax({
      method: 'GET',
      url: 'api/conversations',
      dataType: 'json',
      data: { conversation: theUserId },
      success: function (result) {
        MessageActions.receiveAllConvos(result);
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

  createConversation: function (theParams, messageBody) {
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
          body: this.state.contents
        });
      }
    });
  },

  createMessage: function (theParams) {
    $.ajax({
      method: 'POST',
      url: 'api/messages',
      dataType: 'json',
      data: {message: theParams},
      success: function (newMessage) {
        console.log("You made this:", newMessage);
        MessageActions.receiveNewMessage(newMessage);
      }
    });
  }

};

module.exports = MessageApiUtil;
