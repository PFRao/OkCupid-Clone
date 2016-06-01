var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var _visitors = [];

var VisitorStore = new Store(AppDispatcher);

VisitorStore.all = function () {
  return _visitors;
};

VisitorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case "NEW_VISITORS":
      _visitors = payload.visitors;
      VisitorStore.__emitChange();
      break;
  }
};

module.exports = VisitorStore;
