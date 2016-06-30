var React = require('react');
var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;

var SessionApiUtil = require('./../util/session_api_util');
var SessionStore = require('./../stores/session_store');
var ErrorStore = require('./../stores/error_store');
var UserApiUtil = require('./../util/user_api_util');
var LoginForm = require('./login_form');
var Modal = require('react-modal');

Modal.setAppElement("#content");

var SignupForm = React.createClass({
  getInitialState: function () {
    return {
      username: "",
      password: "",
      location: "",
      birthdate: null,
      gender: "man",
      last_online: new Date(),
      modalIsOpen: false
    };
  },

  _openModal: function (e) {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  },

  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },

  _closeModal: function (e) {
    e.preventDefault();
    this.setState({ modalIsOpen: false });
  },

  _handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ last_online: new Date() });
    UserApiUtil.signup(this.state);
  },

  _guest_login: function () {
    SessionApiUtil.login({
      username: "guest",
      password: "fzfgT76Kjh0",
    });
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

  _changeZip: function (event) {
    this.setState({ location: event.target.value });
  },

  _changeBirthdate: function (event) {
    this.setState({ birthdate: event.target.value });
  },

  _changeGender: function (event) {
    this.setState({ gender: event.target.value });
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
      this.context.router.push("matches");
    }
  },

  fieldErrors: function (field) {
    var errors = ErrorStore.formErrors("signup");
    if (!errors[field]) { return; }

    var messages = errors[field].map(function (errorMsg, i) {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  _goToMainPage: function (event) {
    hashHistory.push({
      pathname: "matches"
    });
  },

  render: function () {

    return (
      <div id="steven">

        <br />


        <div className="top_stuff group">
          <button id="guesty" className="guest_button" onClick={this._guest_login}>Guest Login</button>
          <span id="not_guesty" className="sign_in_button">
            <button className="si_button sign_in_button" onClick={this._openModal}>Sign in!</button>
            <span className="sign_text">What's that? You're already a member?</span>
          </span>
        </div>

        <form className="sign_up" onSubmit={this._handleSubmit}>

          <header>Join lolCupid today! It's totally free and rather easy!</header>

          <div className="errors">
            { this.fieldErrors("base") }
          </div>

          <label>
            Username:
            <span>*</span>
            { this.fieldErrors("username") }
          </label>
          <input type="text" onChange={this._changeUsername} value={this.state.username} />

          <label>
            Password:
            <span>*</span>
            { this.fieldErrors("password") }
          </label>
          <input type="password" onChange={this._changePassword} value={this.state.password} />
          <div className="shelp">Your password must be at least 6 letters long</div>

          <label>
            Zip Code:
            <span>*</span>
          </label>
          <input type="text" onChange={this._changeZip} value={this.state.location} />

          <label>
            Birthday:
            <span>*</span>
          </label>
          <input type="date" onChange={this._changeBirthdate} />

          <div className="gender">
            <label>
              <input type="checkbox" value="man" checked={this.state.gender === "man"} onChange={this._changeGender} />
              Man
              <br />
            </label>

            <label>
              <input type="checkbox" value="woman" checked={this.state.gender === "woman"} onChange={this._changeGender} />
              Woman
              <br />
            </label>
          </div>

          <button type="submit">Find Love!</button>
        </form>

        <Modal
          className="charles"
          ref="mymodal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.handleOnAfterOpenModal}
          onRequestClose={this._closeModal}>

          <LoginForm steven={this._closeModal} />

        </Modal>

      </div>
    );
  }
});

module.exports = SignupForm;
