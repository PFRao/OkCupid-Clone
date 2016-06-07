var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var ApiUtil = require('../util/api_util');

var _answered = [];
var _next;

var QuestionStore = new Store(AppDispatcher);

QuestionStore.answeredQuestions = function () {
  return _answered;
};

QuestionStore.newQuestion = function () {
  return _next;
};

QuestionStore.noNoNoNoNo = function (aQuestion) {
  for (var i = 0; i < _answered.length; i++) {
    if (_answered[i].id === aQuestion.id) { return true; }
  }
  return false;
};

QuestionStore.activeAnswers = function () {
  return ":)";
},

QuestionStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "ANSWERED_QUESTIONS":
      _answered = payload.questions;
      QuestionStore.__emitChange();
      break;
    case "NEW_QUESTION":
      _next = payload.question;
      QuestionStore.__emitChange();
      break;
  }
};

module.exports = QuestionStore;
