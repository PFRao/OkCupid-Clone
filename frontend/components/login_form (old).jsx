var React = require('react');
var UserActions = require('../actions/user_actions');
var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;

var LoginForm = React.createClass({
  getInitialState: function () {
    return { username: "", password: "" };
  },

  _handleSubmit: function () {
    this.setState({ last_online: new Date() });
    UserActions.login(this.state);
    this._goToMainPage();
  },

  _changeUsername: function (event) {
    this.setState({ username: event.target.value });
  },

  _changePassword: function (event) {
    this.setState({ password: event.target.value });
  },

  _goToMainPage: function (event) {
    hashHistory.push({
      pathname: "main"
    });
  },

  render: function () {
    return (
      <div>
        <h3>Sign in now! Millions of Peters await you!</h3>
        What's that? You're not a member yet? <Link to="/">Click here</Link> to join us!

        <br />
        { this.fieldErrors("base") }
        <br />

        <form onSubmit={this._handleSubmit}>
          <label >
            Username:
            { this.fieldErrors("username") }
            <input type="text" onChange={this._changeUsername} value={this.state.username} />
          </label>

          <br /><br />

          <label>
            Password:
            { this.fieldErrors("password") }
            <input type="text" onChange={this._changePassword} value={this.state.password} />
          </label>

          <br /><br />

          <input type="submit" value="Done!" />
        </form>
      </div>
    );
  }
});

module.exports = LoginForm;
