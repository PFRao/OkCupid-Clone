var SessionActions = require('./../actions/session_actions');
var ErrorActions = require('./../actions/error_actions');
var MessageActions = require('./../actions/profile_actions');

var MessageApiUtil = {

  // attatch a "last message" type of method to

  getAllConvos: function (theUserId) {
    $.ajax({
      method: 'GET',
      url: 'api/conversations',
      dataType: 'json',
      data: { conversation: theUserId },
      success: function (result) {
        console.log(result);
      }
    });
  },

  getOneConvo: function () {

  }

};

module.exports = MessageApiUtil;
