var React = require('react');
var PropTypes = React.PropTypes;

var SessionStore = require('../../stores/session_store');
var MessageStore = require('../../stores/message_store');

var MessageApiUtil = require('../../util/message_api_util');

var MessageForm = require('./message_form');

var MessageDetail = React.createClass({
  getInitialState: function () {
    return { theConvo: null };
  },

  componentDidMount: function () {
    this.listener = MessageStore.addListener(this._getToTheConvo);
    MessageApiUtil.getOneConvo(this.props.params.convo_id);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _getToTheConvo: function () {
    this.setState({ theConvo: MessageStore.oneConvo() });
  },

  render: function() {

    if (!this.state.theConvo) {
      return (<p className="loading_message">Please wait, your content is loading...</p>);
    }

    var us;
    var them;

    if (this.state.theConvo.user.id === SessionStore.currentUser().id) {
      us = this.state.theConvo.user;
      them = this.state.theConvo.user2;
    } else {
      us = this.state.theConvo.user2;
      them = this.state.theConvo.user;
    }

    var classiness;

    var hours_ago;
    var milliseconds;
    var hours;

    var messages = this.state.theConvo.messages.map(function (message, index) {

      milliseconds = new Date() - new Date(message.created_at);
      hours = milliseconds / 3600000;

      if (hours < 1) {

        var mintues = hours * 60;

        hours_ago = Math.floor(mintues) + " minute(s)";

      } else {

        hours = Math.floor(hours);

        if (hours === 1){
          hours_ago = "an hour";
        } else if (hours < 24) {
          hours_ago = Math.floor(hours) + " hours";
        } else if (hours < 48) {
          hours_ago = "a day";
        } else {
          hours_ago = (hours/24) + " days";
        }

      }

      if (message.receiver_id === SessionStore.currentUser().id) {
        classiness = "received";
      } else {
        classiness = "sent";
      }

      return (
        <li className={classiness} key={message.id}>
          {message.body}
          <br /><br />
          <p className="message_timestamp">{classiness} {hours_ago} ago</p>
        </li>
      );

    }.bind(this));

    return (
      <ul>
        <p>THIS IS CONVERSATION #{this.props.params.convo_id}</p>
        {messages}

        <br /><br />

        <MessageForm receiver={them} sender={us} convo_id={this.state.theConvo.id} />
      </ul>
    );
  }

});

module.exports = MessageDetail;
