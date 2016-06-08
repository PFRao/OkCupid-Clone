var React = require('react');
var PropTypes = React.PropTypes;

var ProfileStore = require('../../stores/profile_store');
var SessionStore = require('../../stores/session_store');
var MessageStore = require('../../stores/message_store');

var MessageApiUtil = require('../../util/message_api_util');
var UserApiUtil = require('../../util/user_api_util');

var MessageForm = require('../message_stuff/message_form');

var ProfileField = require('./profile_field');
var Modal = require('react-modal');

Modal.setAppElement("#content");

var UserProfile = React.createClass({
  getInitialState: function () {
    return {
      theState: null,
      isThisUs: (SessionStore.currentUser().id === parseInt(this.props.params.user_id)),
      modalIsOpen: false
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
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

  componentDidMount: function () {
    this.listener = ProfileStore.addListener(this._gotUser);
    UserApiUtil.fetchOneUser(this.props.params.user_id);
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

  render: function() {

    if (!this.state.theState) {
      return (<p className="loading_message">Please wait, your content is loading...</p>);
    }

    var warning;
    var modal;
    var messageButton;

    if (this.state.isThisUs) {
      warning = (<p>Welcome to your own profile!</p>);
    } else {
      warning = (<p>Careful, this user isn't you! Don't trust them!</p>);
      modal = (
        <Modal
          className="charles"
          ref="mymodal"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.handleOnAfterOpenModal}
          onRequestClose={this._closeModal}>

          <MessageForm receiver={this.state.theState.user} sender={SessionStore.currentUser()} modal={true}/>

        </Modal>
      );
      messageButton = (
        <button className="submit_that_message" onClick={this._openModal}>Message this fool</button>
      );
    }

    if (this.state.theState) {
      return (
        <div className="user_profile">
          You have reached the profile of: {this.state.theState.user.username}

          <br /><br />

          Here's a picture of {this.state.theState.user.username}! Wow!
          <img className="main_profile_photo" src={window.peterImage} />

          <br />

          {warning}
          {modal}
          {messageButton}

          <br /><br />

          My Self-Summary:
          <br />
          <ProfileField
            fieldName="self_summary" fieldContents={this.state.theState.info.self_summary}
            canWeEdit={this.state.isThisUs}
            theUserId={this.state.theState.user.id} />
          <br />

          What I'm doing with my life:
          <br />
            <ProfileField
              fieldName="do_with_life" fieldContents={this.state.theState.info.do_with_life}
              canWeEdit={this.state.isThisUs}
              theUserId={this.state.theState.user.id} />
          <br />

          I'm really good at:
          <br />
            <ProfileField
              fieldName="real_good_at" fieldContents={this.state.theState.info.real_good_at}
              canWeEdit={this.state.isThisUs}
              theUserId={this.state.theState.user.id} />
          <br />

          The first thing people usually notice about me:
          <br />
            <ProfileField
              fieldName="first_thing" fieldContents={this.state.theState.info.first_thing}
              canWeEdit={this.state.isThisUs}
              theUserId={this.state.theState.user.id} />
          <br />

          My favorite things:
          <br />
            <ProfileField
              fieldName="favorites" fieldContents={this.state.theState.info.favorites}
              canWeEdit={this.state.isThisUs}
              theUserId={this.state.theState.user.id} />
          <br />

          The six things I could never do without:
          <br />
            <ProfileField
              fieldName="six_things" fieldContents={this.state.theState.info.six_things}
              canWeEdit={this.state.isThisUs}
              theUserId={this.state.theState.user.id} />
          <br />

          I spend a lot of time thinking about:
          <br />
            <ProfileField
              fieldName="think_about" fieldContents={this.state.theState.info.think_about}
              canWeEdit={this.state.isThisUs}
              theUserId={this.state.theState.user.id} />
          <br />

          On a typical friday, I am:
          <br />
            <ProfileField
              fieldName="typical_friday" fieldContents={this.state.theState.info.typical_friday}
              canWeEdit={this.state.isThisUs}
              theUserId={this.state.theState.user.id} />
          <br />

          You should message me if:
          <br />
            <ProfileField
              fieldName="message_if" fieldContents={this.state.theState.info.message_if}
              canWeEdit={this.state.isThisUs}
              theUserId={this.state.theState.user.id} />
          <br />
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
