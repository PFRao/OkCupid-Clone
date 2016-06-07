var SessionConstants = require('../constants/session_constants');
var SessionApiUtil = require('../util/session_api_util');
var SessionStore = require('../stores/session_store');
var AppDispatcher = require('../dispatcher/dispatcher');

var ProfileActions = {

  receiveSingleUser: function (singleUser) {
    AppDispatcher.dispatch({
      actionType: "INCOMING",
      user: singleUser,
      info: singleUser.profile
    });
  },

  receiveNewProfile: function (profile) {
    AppDispatcher.dispatch({
      actionType: "INCOMING",
      profile: profile
    });
  }

};

module.exports = ProfileActions;
