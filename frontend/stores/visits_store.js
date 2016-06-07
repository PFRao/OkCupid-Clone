var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var _incoming;
var _outgoing;
var aVisit;

var VisitsStore = new Store(AppDispatcher);

VisitsStore.incoming = function () {
  return _incoming;
};

VisitsStore.outgoing = function () {
  return _outgoing;
};

VisitsStore.show = function () {
  return aVisit;
};

VisitsStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "VISITS_RECEIVED":
      if (payload.type === "incoming") {
        _incoming = payload.visits;
      } else {
        _outgoing = payload.visits;
      }
      VisitsStore.__emitChange();
      break;
    case "VISIT_RECEIVED":
      aVisit = payload.visit;
      VisitsStore.__emitChange();
      break;
  }
};

module.exports = VisitsStore;
