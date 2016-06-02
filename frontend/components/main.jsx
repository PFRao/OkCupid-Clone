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

  redirectIfLoggedOut: function () {
    if (!SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
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
        <button className="go_home" onClick={this._logout}>Stop being a Peter... for now!</button>
        <button className="browse_matches" onClick={this._browse}>Take a look at some of the other Peters</button>
      </div>
    );

  }
});

module.exports = Main;
