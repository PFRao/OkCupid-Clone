var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var _convos = [];
var _messages = [];
var _message;

var MessageStore = new Store(AppDispatcher);

MessageStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "ALL_MESSAGES":
      _messages = payload.messages;
      MessageStore.__emitChange();
      break;
    case "NEW_MESSAGE":
      _message = payload.message;
      MessageStore.__emitChange();
      break;
    case "CONVERSATIONS":
      _convos = payload.convo;
      MessageStore.__emitChange();
      break;
  }
};
