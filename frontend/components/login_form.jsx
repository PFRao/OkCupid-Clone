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
      <form className="sign_in" onSubmit={this._handleSubmit}>
        <header>Millions of beautiful people await...</header>

        { this.fieldErrors("base") }

        <label >
          Username:
          <span>*</span>
        </label>
        { this.fieldErrors("username") }
        <input type="text" onChange={this._changeUsername} value={this.state.username} />
        <div className="help">What's that? You're not a member yet? <span className="implore" onClick={this.props.steven}>Click here</span> to join us!</div>

        <label>
          Password:
          <span>*</span>
        </label>
        { this.fieldErrors("password") }
        <input type="password" onChange={this._changePassword} value={this.state.password} />
        <div className="help">Wow, that's a really stupid password!</div>

        <button type="submit">Done!</button>
      </form>
		);
	}
});

module.exports = LoginForm;
// greed is good
// <Link className="implore" to="/">Click here</Link>
