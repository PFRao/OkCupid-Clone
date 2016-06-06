var ServerActions = require('../actions/server_actions');
// var FilterParamsStore = require('../stores/filter_params');

var LikeApiUtil = {
  likeSomeone: function (theInfo) {
    $.ajax({
      method: "POST",
      url: "api/likes",
      dataType: "json",
      data: { like: theInfo },
      success: function (like) {
        ServerActions.likeAPerson(like);
      }
    });
  },

  unlikeSomeone: function (theInfo) {
    $.ajax({
      method: "DELETE",
      url: "api/likes/1",
      dataType: "json",
      data: { like: theInfo },
      success: function (like) {
        ServerActions.unlikeAPerson(like);
      }
    });
  }
};

module.exports = LikeApiUtil;
