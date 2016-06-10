var React = require('react');

var MatchesStore = require('../../stores/matches_store'),
    ApiUtil = require('../../util/api_util');

var UserIndexItem = require('./user_index_item');
var SessionApiUtil = require('../../util/session_api_util');

var UsersIndex = React.createClass({
  getInitialState: function () {
    SessionApiUtil.fetchCurrentUser();
    return {
      users: null,
      filters: {}
    };
  },

  componentDidMount: function () {
    this.listener = MatchesStore.addListener(this._vincent);
    ApiUtil.fetchPeeps(this.state.filters);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _vincent: function () {
    this.setState({ users: MatchesStore.all() });
  },

  render: function () {

    var wesley;

    if (this.state.users) {
      wesley = this.state.users.map(function (user, index) {
        return <UserIndexItem key={user[0].id} person={user[0]} rating={user[1]} />;
      });
    }

    return (
      <div className="matches_main">
        <ul className="list_o_matches">
          {wesley}
        </ul>
      </div>
    );
  }
});

module.exports = UsersIndex;
