var ServerActions = require('../actions/server_actions');
var FilterParamsStore = require('../stores/filter_params');

var ApiUtil = {
  fetchPeeps: function(filters){
    $.get('api/peeps', filters, function(peep){

    });
  },
};

module.exports = ApiUtil;
