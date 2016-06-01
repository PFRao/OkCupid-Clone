var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var SessionStore = require('./session_store');

var _matches = [];
var stinker;

var MatchesStore = new Store(AppDispatcher);

MatchesStore.beChoosy = function () {
  stinker = SessionStore.all();
};

Matches.beJudgemental = function (quirks) {
  
};

module.exports = MatchesStore;
