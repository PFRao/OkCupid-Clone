var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var UserApiUtil = require('../util/user_api_util');

var SessionStore = require('./session_store');

var theUser;
var theStats;
var thePreferences;
var theInfo;

var ProfileStore = new Store(AppDispatcher);

ProfileStore.userIs = function (id) {
  return {
    user: theUser,
    stats: theStats,
    preferences: thePreferences,
    info: theInfo
  };
};

ProfileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "INCOMING":
      theUser = payload.user;
      theInfo = payload.info;
      ProfileStore.__emitChange();
      break;
    case "PROFILE_UPDATED":
      theInfo = payload.profile;
      ProfileStore.__emitChange();
      break;
  }
};

module.exports = ProfileStore;
