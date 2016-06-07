var SessionActions = require('./../actions/session_actions');
var ErrorActions = require('./../actions/error_actions');
var ProfileActions = require('./../actions/profile_actions');

var ProfileApiUtil = require('./profile_api_util');

var UserApiUtil = {

  signup: function (formData) {
    $.ajax({
      url: '/api/user',
      method: 'POST',
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
        ProfileApiUtil.createProfile({ user_id: currentUser.id });
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
      method: 'PATCH',
      dataType: 'json',
      data: {user: formData},
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      },
      error: function (xhr) {
        console.log('UserApiUtil#updateAccount error');
        var errors = xhr.responseJSON;
        ErrorActions.setErrors("login", errors);
      }
    });
  },

  fetchOneUser: function (id) {
    $.ajax({
      method: 'GET',
      url: '/api/peeps/' + id,
      dataType: 'json',
      data: { id: id },
      success: function (theResult) {
        // debugger
        ProfileActions.receiveSingleUser(theResult);
      },
    });
  }

};

module.exports = UserApiUtil;
