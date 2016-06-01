var React = require('react');
var Link = require('react-router').Link;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var ErrorStore = require('./../stores/error_store');
var UserApiUtil = require('./../util/user_api_util');
var hashHistory = require('react-router').hashHistory;

var LoginForm = React.createClass({
	mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      username: "",
      password: ""
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _changeUsername: function (event) {
    this.setState({ username: event.target.value });
  },

  _changePassword: function (event) {
    this.setState({ password: event.target.value });
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

	_handleSubmit: function (e) {
		e.preventDefault();

		var formData = {
			username: this.state.username,
			password: this.state.password
		};

    SessionApiUtil.login(formData);

    // if (this.props.location.pathname === "/login") {
    //   SessionApiUtil.login(formData);
    // } else {
    //   UserApiUtil.signup(formData);
    // }
	},

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors("login");
    if (!errors[field]) { return; }

    var messages = errors[field].map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
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
            <input type="password" onChange={this._changePassword} value={this.state.password} />
          </label>

          <br /><br />

          <input type="submit" value="Done!" />
        </form>
      </div>
		);
	}
});

module.exports = LoginForm;
// greed is good
