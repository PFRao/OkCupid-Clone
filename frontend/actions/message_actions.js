var SessionApiUtil = require('../util/session_api_util');
var SessionStore = require('../stores/session_store');
var AppDispatcher = require('../dispatcher/dispatcher');

var MessageActions = {

  receiveAllConvos: function (convos) {
    AppDispatcher.dispatch({
      actionType: "CONVERSATIONS",
      convos: convos
    });
  },

  receiveOneConvo: function (convo) {
    AppDispatcher.dispatch({
      actionType: "CONVERSATION",
      convo: convo
    });
  },

  receiveNewMessage: function (message) {
    AppDispatcher.dispatch({
      actionType: "NEW_MESSAGE",
      convo_id: message.convo_id
    });
  }

};

module.exports = MessageActions;
