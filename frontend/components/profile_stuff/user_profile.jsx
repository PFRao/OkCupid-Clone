var React = require('react');
var PropTypes = React.PropTypes;

var ProfileStore = require('../../stores/profile_store');
var SessionStore = require('../../stores/session_store');
var MessageStore = require('../../stores/message_store');

var MessageApiUtil = require('../../util/message_api_util');
var UserApiUtil = require('../../util/user_api_util');

var MessageForm = require('../message_stuff/message_form');
var ProfileInfo = require('./profile_info');
var Questions = require('../question_stuff/questions');
var UploadButton = require('../upload_button');

var Modal = require('react-modal');

var _conversation_already_exists;

var theMonths = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

Modal.setAppElement("#content");

var UserProfile = React.createClass({

  getInitialState: function () {
    UserApiUtil.fetchOneUser(this.props.params.user_id);
    return {
      theState: null,
      isThisUs: (SessionStore.currentUser().id === parseInt(this.props.params.user_id)),
      modalIsOpen: false,
      whichPane: "info"
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _openModal: function (e) {

    e.preventDefault();
    _conversation_already_exists = MessageStore.existing(parseInt(this.props.params.user_id));

    if(_conversation_already_exists) {
      this.context.router.push("messages/" + _conversation_already_exists);
    } else {
      this.setState({ modalIsOpen: true });
    }

  },

  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },

  _closeModal: function () {
    this.setState({ modalIsOpen: false });
  },

  componentDidMount: function () {
    this.listener = ProfileStore.addListener(this._gotUser);
    UserApiUtil.fetchOneUser(this.props.params.user_id);
    MessageApiUtil.getAllConvos({ user_id: SessionStore.currentUser().id });
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  componentWillReceiveProps: function(nextProps) {
    UserApiUtil.fetchOneUser(nextProps.params.user_id);
    this.setState({
      theState: ProfileStore.userIs(),
      isThisUs: (SessionStore.currentUser().id === parseInt(nextProps.params.user_id))
    });
  },

  _gotUser: function () {
    this.setState({ theState: ProfileStore.userIs() });
  },

  _changeTab: function (event) {
    this.setState({ whichPane: event.target.value });
  },

  render: function() {

    if (!this.state.theState) {
      return (<div className="loading_message">Please wait, your content is loading...</div>);
    }

    var date;
    date = new Date(this.state.theState.user.last_online);

    var theM = "am";
    if (date.getHours() >= 12) { theM = "pm"; }

    var hours = (date.getHours() % 12);
    if (hours === 0) { hours = 12; }

    var theColon = ":";
    if (date.getMinutes() < 10) { theColon = ":0"; }

    var time = hours + theColon + date.getMinutes() + theM;

    var last_login = theMonths[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " at " + time;

    var warning;
    var existence;
    var modal;
    var messageButton;
    var theChoice;
    var thePicture = (<img className="main_profile_photo" src={this.state.theState.user.image_url} />);
    var thePane = (<ProfileInfo
      theprops={this.state.theState}
      isThisUs={this.state.isThisUs} />);

    var tab = this.state.whichPane;

    if (this.state.isThisUs) {
      warning = (<p className="last_login">You last logged in at: {last_login}</p>);
      if (this.state.whichPane === "q&a") {
        thePane = (<Questions />);
      }
      theChoice = (
        <div>
          <button className={"likes_selector" + (tab === "info" ? " active" : "")} onClick={this._changeTab} value="info">Your Profile</button>
          <button className={"likes_selector" + (tab === "q&a" ? " active" : "")} onClick={this._changeTab} value="q&a">Find Yourself</button>
        </div>
      );
      thePicture = (<UploadButton user={this.state.theState.user} />);
    } else {
      warning = (<p className="last_login">This user last logged in at: {last_login}</p>);
      modal = (
        <Modal
          className="charles"
          ref="mymodal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.handleOnAfterOpenModal}
          onRequestClose={this._closeModal}>

          <ul className="profile_message">
            <MessageForm receiver={this.state.theState.user} sender={SessionStore.currentUser()} />
          </ul>

        </Modal>
      );
      messageButton = (
        <button className="profile_message_button" onClick={this._openModal}>Send a Message</button>
      );

    }

    if (this.state.theState) {
      return (
        <div className="user_profile">
          <div className="user_name_header">
            {thePicture} &nbsp;
            {this.state.theState.user.username}
          </div>

          <br />

          {warning}
          {modal}
          {messageButton}

          {theChoice}

          <br />

          {thePane}

        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }

});

module.exports = UserProfile;
