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
        // SessionActions.receiveCurrentUser(currentUser);
        UserApiUtil.update({
          id: currentUser.id,
          personality: JSON.stringify({you: {
            active: 0,
            outdoorsy: 0,
            outgoing: 0,
            sports: 0,
            pop_culture: 0,
            conservative: 0,
            rebellious: 0,
            optimistic: 0,
            traditional: 0,
            organized: 0,
            religious: 0
          }, them: {
            active: 0,
            outdoorsy: 0,
            outgoing: 0,
            sports: 0,
            pop_culture: 0,
            conservative: 0,
            rebellious: 0,
            optimistic: 0,
            traditional: 0,
            organized: 0,
            religious: 0
          }})
        });
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
