var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var _incoming = [];
var _outoging = [];

var VisitsStore = new Store(AppDispatcher);

VisitsStore.incoming = function () {
  return _incoming;
};

VisitsStore.outgoing = function () {
  return _outoging;
};

VisitsStore.__onDispatch = function (payload) {
  debugger
  switch (payload.actionType) {
    case "VISITS_RECEIVED":
      if (payload.type === "incoming") {
        _incoming = payload.visits;
      } else {
        _outgoing = payload.visits;
      }
      VisitsStore.__emitChange();
      break;
  }
};

module.exports = VisitsStore;
