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

  _closeModal: function () {
    this.setState({ modalIsOpen: false });
  },

  _handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ last_online: new Date() });
    UserApiUtil.signup(this.state);
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
      <div id="steven">
        <form className="sign_up" onSubmit={this._handleSubmit}>

          <header>Join OkPeter today! It's totally free and rather easy!</header>

          { this.fieldErrors("base") }

          <label>
            Username:
            <span>*</span>
            { this.fieldErrors("username") }
          </label>
          <input type="text" onChange={this._changeUsername} value={this.state.username} />
          <div className="help">What's that? You're already a member? <span className="implore" onClick={this._openModal}>Click here</span> to log in!</div>

          <label>
            Password:
            <span>*</span>
            { this.fieldErrors("password") }
          </label>
          <input type="password" onChange={this._changePassword} value={this.state.password} />

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

          <button type="submit">Become a Peter!</button>
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