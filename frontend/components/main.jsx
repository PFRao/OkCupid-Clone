var React = require('react');
var Link = require('react-router').Link;

var SessionStore = require('../stores/session_store');
var MatchesStore = require('../stores/matches_store');

var SessionApiUtil = require('./../util/session_api_util');
var UserApiUtil = require('./../util/user_api_util');

var Main = React.createClass({
  getInitialState: function () {
    return { user: SessionStore.currentUser() };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    this.listener = SessionStore.addListener(function () {
      this.setState({ user: SessionStore.currentUser() });
    }.bind(this));
    this.otherListener = SessionStore.addListener(function () {
      if (!SessionStore.isUserLoggedIn()) {
        this.redirectIfLoggedOut();
      }
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.listener.remove();
    this.otherListener.remove();
  },

  _logout: function () {
    SessionApiUtil.logout();
  },

  _browse: function () {
    this.context.router.push("matches");
  },

  _interrogate: function () {
    this.context.router.push("questions");
  },

  redirectIfLoggedOut: function () {
    if (!SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

  render: function () {

    return (
      <div>
        <button className="main_page_button" onClick={this._browse}>Browse  matches</button><br />
        <button className="main_page_button" onClick={this._logout}>Log out</button><br />
      </div>
    );

  }
});

module.exports = Main;
