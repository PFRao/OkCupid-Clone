var AppDispatcher = require('../dispatcher/dispatcher');

var ApiActions = {
  receiveAllUsers: function(visitors){
    AppDispatcher.dispatch({
      actionType: "NEW_VISITORS",
      visitors: visitors
    });
  },
};

module.exports = ApiActions;
