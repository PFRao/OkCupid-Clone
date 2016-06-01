var AppDispatcher = require('../dispatcher/dispatcher');
var BenchConstants = require('../constants/bench_constants');

var ApiActions = {
  receiveAllUser: function(visitors){
    AppDispatcher.dispatch({
      actionType: "NEW_VISITORS",
      visitors: visitors
    });
  },
  receiveSingleBench: function(bench){
    AppDispatcher.dispatch({
      actionType: BenchConstants.BENCH_RECEIVED,
      bench: bench
    });
  }
};

module.exports = ApiActions;
