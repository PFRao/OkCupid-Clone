var AppDispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var SessionConstants = require('../constants/session_constants');

var SessionStore = new Store(AppDispatcher);

var _currentUser = {},
    _currentUserHasBeenFetched = false;

function _login(currentUser) {
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
}

function _logout() {
  _currentUser = {};
  _currentUserHasBeenFetched = true;
}

SessionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.currentUser);
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
    	_logout();
      SessionStore.__emitChange();
      break;
    case "LIKES_TOGGLED":
      SessionStore.__emitChange();
      break;
  }
};

SessionStore.currentUser = function () {
	return $.extend({}, _currentUser);
};

SessionStore.update = function () {
  SessionApiUtil.hubert();
};

SessionStore.currentUserPersonality = function () {
  return JSON.parse(_currentUser.personality);
};

SessionStore.doesCurrentUserLike = function (somePerson) {
  for (var i = 0; i < _currentUser.likees.length; i++) {
    if (_currentUser.likees[i].id === somePerson.id) {
      return true;
    }
  }
  return false;
};

SessionStore.isCurrentUserLikedBy = function (somePerson) {
  for (var i = 0; i < _currentUser.likers.length; i++) {
    if (_currentUser.likers[i].id === somePerson.id) {
      return true;
    }
  }
  return false;
};

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = function () {
  return !!_currentUser.id;
};

module.exports = SessionStore;
