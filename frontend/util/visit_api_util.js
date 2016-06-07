var ServerActions = require('../actions/server_actions');

var VisitApiUtil = {
  createVisit: function (theIds) {
    $.ajax({
      method: 'POST',
      url: 'api/visits',
      dataType: 'json',
      data: {visit: theIds},
      success: function () {
        console.log("Visit created!");
      },
      faliure: function (xhr) {
        console.log("Somebody set us up the bomb!");
      }
    });
  },

  deleteVisit: function (theIds) {
    $.ajax({
      method: 'DELETE',
      url: 'api/visits/1',
      dataType: 'json',
      data: {visit: theIds},
      success: function () {
        console.log("Visit destroyed!");
      },
      faliure: function (xhr) {
        console.log("Somebody set us up the bomb!");
      }
    });
  },

  getAllVisits: function (theCurrentUserId, theType) {
    $.ajax({
      method: 'GET',
      url: 'api/visits',
      dataType: 'json',
      data: { visit: { visitor_id: theCurrentUserId, type: theType } },
      success: function (theVisits) {
        ServerActions.receiveAllVisits(theVisits, theType);
      }
    });
  }
};

module.exports = VisitApiUtil;
