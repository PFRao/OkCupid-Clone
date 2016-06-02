var SessionActions = require('./../actions/session_actions');
var ErrorActions = require('./../actions/error_actions');

var UserApiUtil = {

  signup: function (formData) {
    $.ajax({
      url: '/api/user',
      type: 'POST',
      dataType: 'json',
      data: {user: formData},
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      },
      error: function (xhr) {
        console.log('UserApiUtil#createAccount error');
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("signup", errors);
      }
    });
  },

  update: function (formData) {
    $.ajax({
      url: '/api/user',
      type: 'PATCH',
      dataType: 'json',
      data: {user: formData},
      success: function (currentUser) {
        console.log("Current Session Token:" + currentUser.session_token);

        SessionActions.receiveCurrentUser(currentUser);
      },
      error: function (xhr) {
        console.log('UserApiUtil#updateAccount error');
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("login", errors);
      }
    });
  }

};

module.exports = UserApiUtil;
