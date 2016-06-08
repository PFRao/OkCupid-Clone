var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var MessageApiUtil = require('../util/message_api_util');

var _convos = [];
var _messages = [];
var _convo;
var _message;

var MessageStore = new Store(AppDispatcher);

MessageStore.allConvos = function () {
  return _convos;
};

MessageStore.oneConvo = function () {
  return _convo;
};

MessageStore.getLatestMessage = function (convo_id) {
  for (var i = 0; i < _convos.length; i++) {
    if (_convos[i].id === convo_id) {
      return _convos[i].messages[_convos[i].messages.length - 1];
    }
  }
};

MessageStore.existing = function (counterpartyId) {
  for (var i = 0; i < _convos.length; i++) {
    console.log(_convos[i], counterpartyId);
    if (_convos[i].user.id === counterpartyId || _convos[i].user2.id === counterpartyId) {
      return _convos[i].id;
    }
  }
  return false;
};

MessageStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "ALL_MESSAGES":
      _messages = payload.messages;
      MessageStore.__emitChange();
      break;
    case "NEW_MESSAGE":
      MessageApiUtil.getOneConvo(payload.convo_id);
      break;
    case "CONVERSATIONS":
      _convos = payload.convos;
      MessageStore.__emitChange();
      break;
    case "CONVERSATION":
      _convo = payload.convo;
      MessageStore.__emitChange();
      break;
  }
};

module.exports = MessageStore;
