var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var SessionStore = require('./session_store');

var _matches = [];
var _stinkers = [];
var _stinker;

var MatchesStore = new Store(AppDispatcher);

Matches.all = function () {
  return _matches;
};

MatchesStore.beChoosy = function () {
  _stinker = SessionStore.currentUser();
};

MatchesStore.beJudgemental = function (quirks) {

};

MatchesStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "NEW_VISITORS":
      _stinkers = payload.visitors;
      VisitorStore.__emitChange();
      break;
  }
};

module.exports = MatchesStore;
