var ServerActions = require('../actions/server_actions');
var FilterParamsStore = require('../stores/filter_params');

var ApiUtil = {
  fetchPeeps: function(filters){
    $.get('api/peeps', filters, function(peeps){
      ServerActions.receiveAllUsers(peeps);
    });
  },

  fetchAllUserQuestions: function (thePerson) {
    $.ajax({
      method: 'GET',
      url: 'api/questions',
      dataType: 'json',
      data: { user: thePerson },
      success: function (questions) {
        ServerActions.receiveAnsweredQuestions(questions);
      }
    });
  },

  fetchAnotherQuestion: function () {
    $.ajax({
      method: 'GET',
      url: 'api/questions/new',
      dataType: 'json',
      success: function (question) {
        ServerActions.receiveNewQuestion(question);
      }
    });
  },

  answerQuestion: function (answerInfo) {
    // debugger
    $.ajax({
      method: 'POST',
      url: 'api/answers',
      dataType: 'json',
      data: { answer: answerInfo },
      success: function (answer) {
      },
      error: function (answer) {
      }
    });
  }
};

module.exports = ApiUtil;
