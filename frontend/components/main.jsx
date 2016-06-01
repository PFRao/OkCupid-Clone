var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var UserApiUtil = require('./../util/user_api_util');

var Main = React.createClass({
  getInitialState: function () {
    return { user: null };
  },

  componentDidMount: function () {
    this.listener = SessionStore.addListener(function () {
      this.setState({ user: SessionStore.currentUser() });
    }.bind(this));
    SessionApiUtil.fetchCurrentUser();
  },

  render: function () {

    var candy;

    if (this.state.user) {
      candy = [<li>Your name is: {this.state.user.username}</li>, <li>You logged in at: {this.state.user.last_online}</li>];
    } else {
      candy = <li></li>;
    }

    return (
      <div>
        <ul>
          {candy}
        </ul>
      </div>
    );
  }
});

module.exports = Main;
