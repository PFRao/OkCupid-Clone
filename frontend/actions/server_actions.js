var AppDispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receiveAllUsers: function (visitors) {
    AppDispatcher.dispatch({
      actionType: "NEW_VISITORS",
      visitors: visitors
    });
  },

  receiveAnsweredQuestions: function (questions) {
    AppDispatcher.dispatch({
      actionType: "ANSWERED_QUESTIONS",
      questions: questions
    });
  },

  receiveNewQuestion: function (question) {
    AppDispatcher.dispatch({
      actionType: "NEW_QUESTION",
      question: question
    });
  }
};

module.exports = ApiActions;
