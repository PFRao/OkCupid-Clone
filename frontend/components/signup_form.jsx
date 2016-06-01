var React = require('react');
var UserApiUtil = require('./../util/user_api_util');
var LoginForm = require('./login_form');
var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;

var SignupForm = React.createClass({
  getInitialState: function () {
    return {
      username: "",
      password: "",
      location: "",
      birthdate: null,
      last_online: new Date()
    };
  },

  _handleSubmit: function () {
    this.setState({ last_online: new Date() });
    UserApiUtil.signup(this.state);
    this._goToMainPage();
  },

  _changeUsername: function (event) {
    this.setState({ username: event.target.value });
  },

  _changePassword: function (event) {
    this.setState({ password: event.target.value });
  },

  _changeZip: function (event) {
    this.setState({ location: event.target.value });
  },

  _changeBirthdate: function (event) {
    this.setState({ birthdate: event.target.value });
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  redirectIfLoggedIn: function () {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("main");
    }
  },

  _goToMainPage: function (event) {
    hashHistory.push({
      pathname: "main"
    });
  },

  render: function () {
    return (
      <div>
        <h3>Join OkPeter today! It's totally free and rather easy!</h3>
        What's that? You're already a member? <Link to="/login">Click here</Link> to log in!

        <br /><br />

        <form onSubmit={this._handleSubmit}>

          <label >
            Username:
            <input type="text" onChange={this._changeUsername} value={this.state.username} />
          </label>

          <br /><br />

          <label>
            Password:
            <input type="password" onChange={this._changePassword} value={this.state.password} />
          </label>

          <br /><br />

          <label>
            Zip Code:
            <input type="text" onChange={this._changeZip} value={this.state.location} />
          </label>

          <br /><br />

          <label>
            Birthday:
            <input type="date" onChange={this._changeBirthdate} />
          </label>

          <br /><br />

          <input type="submit" value="Done!" />
        </form>
      </div>
    );
  }
});

module.exports = SignupForm;
