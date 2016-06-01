var AppDispatcher = require('../dispatcher/dispatcher');
var ErrorConstants = require('../constants/error_constants');

var ErrorActions = {
  setErrors: function (form, errors) {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      form: form,
      errors: errors
    });
  },

  clearErrors: function () {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERRORS
    });
  }
};

module.exports = ErrorActions;
