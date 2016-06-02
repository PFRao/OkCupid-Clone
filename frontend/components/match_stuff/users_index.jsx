var React = require('react');

var MatchesStore = require('../../stores/matches_store'),
    ApiUtil = require('../../util/api_util');

var UserIndexItem = require('./user_index_item');

var UsersIndex = React.createClass({
  getInitialState: function () {
    return {
      users: null,
      filters: {}
    };
  },

  componentDidMount: function () {
    MatchesStore.addListener(this._vincent);
    ApiUtil.fetchPeeps(this.state.filters);
  },

  _vincent: function () {
    this.setState({ users: MatchesStore.all() });
  },

  render: function () {

    var wesley;

    if (this.state.users) {
      wesley = this.state.users.map(function (user, index) {
        console.log(user);
        return <UserIndexItem key={user[0].id} person={user[0]} rating={user[1]} />;
      });
    }

    return (
      <div className="list_o_matches">
        <ul className="list_o_matches">
          {wesley}
        </ul>
      </div>
    );
  }
});

module.exports = UsersIndex;
