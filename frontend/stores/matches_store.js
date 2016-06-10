var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var ApiUtil = require('../util/api_util');

var SessionStore = require('./session_store');
var QuestionStore = require('./question_store');

var _matches;
var _stinkers;
var _stinker;

var _ATTRIBUTES = [
  "active",
  "outdoorsy",
  "outgoing",
  "sports",
  "pop_culture",
  "conservative",
  "rebellious",
  "optimistic",
  "traditional",
  "organized",
  "religious"
];

var MatchesStore = new Store(AppDispatcher);

MatchesStore.all = function (randall) {
  // if (!_matches) { MatchesStore.beChoosy(randall); }
  MatchesStore.beChoosy(randall);
  return _matches;
};

MatchesStore.beChoosy = function (susan) {
  var kyle;

  _stinker = SessionStore.currentUser();
  _stinkers = _remove(_stinkers, _stinker);

  kyle = _stinkers.map(function (person, index) {
    return [person, MatchesStore.beJudgemental(_stinker, person)];
  });

  _matches = MatchesStore.beSelective(kyle, susan);
};

MatchesStore.beJudgemental = function (stinker, otherStinker) {
  // return Math.floor(Math.random() * (100 - 1 + 1)) + 1;

  var theCount = _getQuestionCounts(stinker);
  var theOtherCount = _getQuestionCounts(otherStinker);

  var thePersonality = JSON.parse(stinker.personality);
  var theOtherPersonality = JSON.parse(otherStinker.personality);

  console.log("your personality:", thePersonality);
  console.log(stinker.personality);
  console.log("their personality:", theOtherPersonality);
  console.log(otherStinker.personality);

  var theScore = 0;

  _ATTRIBUTES.forEach(function (attr) {
    theScore += Math.abs((thePersonality.you[attr] / theCount[attr]) - (theOtherPersonality.them[attr] / theOtherCount[attr]));
  }.bind(this));

  _ATTRIBUTES.forEach(function (attr) {
    theScore += Math.abs((thePersonality.them[attr] / theCount[attr]) - (theOtherPersonality.you[attr] / theOtherCount[attr]));
  }.bind(this));

  return (100 - (theScore/5));
};

MatchesStore.beSelective = function (pickle, gregory) {
  var martin = pickle.sort(_compare);
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
  for (var i = 0; i < theList.length; i++) {
    if (theList[i].id === theUser.id) { theList.splice(i, 1); }
  }

  return theList;
};

var _compare = function (a, b) {
  if (a[1] > b[1]) {
    return -1;
  } else {
    return 1;
  }
};

var _getQuestionCounts = function (theUser) {
  theCount = {};

  _ATTRIBUTES.forEach(function (theAttribute) {
    theCount[theAttribute] = 1;
  });

  return theCount;
};

module.exports = MatchesStore;
