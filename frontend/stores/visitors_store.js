var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var VisitorStore = new Store(AppDispatcher);

module.exports = VisitorStore;
