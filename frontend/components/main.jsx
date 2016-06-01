var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session_store');
var SessionApiUtil = require('./../util/session_api_util');
var UserApiUtil = require('./../util/user_api_util');

var Main = React.createClass({
  getInitialState: function () {
    return { user: SessionStore.currentUser() };
  },

  componentDidMount: function () {
    this.listener = SessionStore.addListener(function () {
      this.setState({ user: SessionStore.currentUser() });
    }.bind(this));
    this.otherListener = SessionStore.addListener(function () {
      if (SessionStore.isUserLoggedIn()) {
        this._backToLogin();
      }
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _logout: function () {
    SessionApiUtil.logout();
  },

  render: function () {

    var candy;

    if (this.state.user) {
      candy = <p>You logged in at: {this.state.user.last_online}.</p>;
    } else {
      candy = <p>There is nothing here, lad.</p>;
    }

    return (
      <div>
        {candy}
        <button onClick={this._logout}>Log the fuck out</button>
      </div>
    );
  }
});

module.exports = Main;
