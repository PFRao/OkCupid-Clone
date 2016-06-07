var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var SessionStore = require('./session_store');

_incoming = [];
_outgoing = [];

var LikesStore = new Store(AppDispatcher);

LikesStore.allIncoming = function () {
  return _incoming;
};

LikesStore.allOutgoing = function () {
  return _outgoing;
};

LikesStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "INCOMING":
      _incoming = payload.demLikes;
      LikesStore.__emitChange();
      break;
    case "OUTGOING":
      _outgoing = payload.demLikes;
      LikesStore.__emitChange();
      break;
  }
};

module.exports = LikesStore;
