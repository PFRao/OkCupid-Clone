var SessionActions = require('./../actions/session_actions');
var ErrorActions = require('./../actions/error_actions');
var ProfileActions = require('./../actions/profile_actions');

var ProfileApiUtil = {

  createProfile: function (id) {
    $.ajax({
      method: "POST",
      url: "api/profiles",
      dataType: "json",
      data: { profile: id },
      success: function(newProfile) {
      },
      error: function () {
      }
    });
  },

  updateProfile: function (id, formData) {
    $.ajax({
      method: "PATCH",
      url: "api/profiles/" + id,
      dataType: "json",
      data: { profile: formData },
      success: function(newProfile) {
        ProfileActions.receiveNewProfile(newProfile);
      },
      error: function () {
      }
    });
  }

};

module.exports = ProfileApiUtil;
