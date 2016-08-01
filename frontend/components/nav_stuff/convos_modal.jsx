var React = require('react');
var PropTypes = React.PropTypes;

var ModalIndexItem = require('./modal_index_item');
var SessionStore = require('../../stores/session_store');
var MessageStore = require('../../stores/message_store');

var MessageApiUtil = require('../../util/message_api_util');

var ConvosModal = React.createClass({

  getInitialState: function () {
    return { convos: MessageStore.allConvos() };
  },

  componentDidMount: function () {
    // add logic to add NEW conversations as they appear

    // this.pusher = new Pusher('8912b275855afe98c4d3', {
    //   encrypted: true
    // });
    //
    // var channel = this.pusher.subscribe('user_' + SessionStore.currentUser().id);
    // channel.bind('notify_user', function(data) {
    //   MessageApiUtil.getAllConvos({ user_id: SessionStore.currentUser().id }, this._updateConvos);
    // }.bind(this));
  },

  componentWillUnmount: function () {
    // this.pusher.unsubscribe('user_' + SessionStore.currentUser().id);
  },

  _updateConvos: function () {

  },

  render: function() {

    var board;
    var person;
    var unread;

    if (this.state.convos) {

      board = this.state.convos.map(function (convo) {

        if (SessionStore.currentUser().id === convo.user.id) {
          person = convo.user2;
        } else {
          person = convo.user;
        }

        if (MessageStore.isItUnread(convo.id)) {
          unread = true;
        } else {
          unread = false;
        }

        return (
          <ModalIndexItem unread={unread} update={this.props.update} open={this.props.open} key={convo.id} person={person} convo={convo}/>
        );

      }.bind(this));

    } else {

      return (<div className="loading_message"></div>);

    }

    return (
      <div className="message_modal_main">
        <ul>
          {board}
        </ul>
      </div>
    );
  }

});

module.exports = ConvosModal;
