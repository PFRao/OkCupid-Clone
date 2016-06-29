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

    this.pusher = new Pusher('8912b275855afe98c4d3', {
      encrypted: true
    });

    var channel = this.pusher.subscribe('convo_' + this.props.params.convo_id);
    channel.bind('message_sent', function(data) {
      MessageApiUtil.getOneConvo(this.props.params.convo_id);
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.pusher.unsubscribe('convo_' + this.props.params.convo_id)
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
    var imgURL;
    var imgClass;

    var hours_ago;
    var milliseconds;
    var hours;

    var messages = this.state.theConvo.messages.map(function (message, index) {

      imgClass = "message_user_thumbnail";

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
          hours_ago = Math.floor(hours/24) + " days";
        }

      }

      if (message.receiver_id === SessionStore.currentUser().id) {
        classiness = "received";
        imgURL = them.image_url;
        imgClass += " their_picture"
      } else {
        classiness = "sent";
        imgURL = SessionStore.currentUser().image_url;
        imgClass += " my_picture"
      }

      return (
        <li className={classiness} key={message.id}>
          {message.body}
          <br /><br />
          <img className={imgClass} src={imgURL} />
          <p className="message_timestamp">{classiness} {hours_ago} ago</p>
        </li>
      );

    }.bind(this));

    return (
      <div className="message_detail_list">
        <h1>Conversation with {them.username}</h1>
        <ul >
          {messages}
          <MessageForm receiver={them} sender={us} convo_id={this.state.theConvo.id} />
        </ul>
      </div>
    );
  }

});

module.exports = MessageDetail;
