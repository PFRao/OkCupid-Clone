var ApiUtil = require('../util/api_util');

var ClientActions = {
  fetchBenches: ApiUtil.fetchBenches,
  createBench: ApiUtil.createBench,
  createReview: ApiUtil.createReview,
};

module.exports = ClientActions;
