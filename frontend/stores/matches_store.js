var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var ApiUtil = require('../util/api_util');

var SessionStore = require('./session_store');

var _matches;
var _stinkers;
var _stinker;

var MatchesStore = new Store(AppDispatcher);

MatchesStore.all = function (randall) {
  if (!_matches) { MatchesStore.beChoosy(randall); }
  return _matches;
};

MatchesStore.beChoosy = function (susan) {
  var kyle;

  _stinker = SessionStore.currentUser();
  // ApiUtil.fetchPeeps();

  kyle = _stinkers.map(function (person, index) {
    return [person, MatchesStore.beJudgemental(_stinker, person), index];
  });

  _matches = MatchesStore.beSelective(kyle, susan);
};

MatchesStore.beJudgemental = function (stinker, otherStinker) {
  return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
};

MatchesStore.beSelective = function (pickle, gregory) {
  var martin = pickle.sort(_compare);
  console.log("pickle:", pickle);
  console.log("martin:", martin);
  martine = martin.map(function (herman, index) {
    return [herman[0], herman[1]];
  });
  if (gregory) { return martine.slice(0, gregory); }
  return martine;
};

MatchesStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "NEW_VISITORS":
      _stinkers = payload.visitors;
      MatchesStore.__emitChange();
      break;
  }
};

var _remove = function (theList, theUser) {

};

var _compare = function (a, b) {
  if (a[1] > b[1]) {
    return -1;
  } else {
    return 1;
  }
};

module.exports = MatchesStore;
