var React = require('react');
var PropTypes = React.PropTypes;

var SessionStore = require('../../stores/session_store');
var MessageStore = require('../../stores/message_store');

var MessageApiUtil = require('../../util/message_api_util');

var ModalForm = require('./modal_form');

var QuickMessages = React.createClass({

  getInitialState: function () {
    return { theConvo: this.props.convo };
  },

  componentDidMount: function () {
    this.listener = MessageStore.addListener(this._getToTheConvo);
    MessageApiUtil.getOneConvo(this.state.theConvo.id);

    this.pusher = new Pusher('8912b275855afe98c4d3', {
      encrypted: true
    });

    var channel = this.pusher.subscribe('convo_' + this.state.theConvo.id);
    channel.bind('message_sent', function(data) {
      MessageApiUtil.getOneConvo(this.state.theConvo.id);
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.pusher.unsubscribe('convo_' + this.state.theConvo.id)
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
        classiness = "received_modal";
      } else {
        classiness = "sent_modal";
      }

      return (
        <li className={classiness} key={message.id}>
          {message.body}
        </li>
      );

    }.bind(this));

    return (
    <div className="quickModal modalModalModal">
      <span className="message_modal_header">
        <button className="xbox" onClick={this.props.close}>X</button>
        <img className='message_box_img' src={them.image_url} />
        <h1>Conversation with {them.username}</h1>
      </span>
      <div className="messagesModal">
        <ul className="modal_message_list group">
          {messages}
        </ul>
      </div>
      <ModalForm receiver={them} sender={us} convo_id={this.state.theConvo.id} />
    </div>
    );
  }

});

module.exports = QuickMessages;
