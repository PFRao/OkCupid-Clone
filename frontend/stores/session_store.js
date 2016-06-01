var AppDispatcher = require('../dispatcher/dispatcher.js');
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
      console.log("we have reached the store.");
      console.log("but why have we shown up twice?");
      _login(payload.currentUser);
      SessionStore.__emitChange();
      break;
    case SessionConstants.LOGOUT:
    	_logout();
      SessionStore.__emitChange();
      break;
    // case FavoriteConstants.FAVORITE_RECEIVED:
    //   _addFavorite(payload.favorite.benchId);
    //   SessionStore.__emitChange();
    //   break;
    // case FavoriteConstants.FAVORITE_REMOVED:
    //   _removeFavorite(payload.favorite.benchId);
    //   SessionStore.__emitChange();
    //   break;
  }
};

SessionStore.currentUser = function () {
	return $.extend({}, _currentUser);
};

SessionStore.currentUserHasBeenFetched = function () {
  return _currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = function () {
  return !!_currentUser.id;
};

module.exports = SessionStore;
