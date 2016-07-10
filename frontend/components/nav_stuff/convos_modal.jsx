var React = require('react');
var PropTypes = React.PropTypes;

var ModalIndexItem = require('./modal_index_item');
var SessionStore = require('../../stores/session_store');
var MessageStore = require('../../stores/message_store');

var MessageApiUtil = require('../../util/message_api_util');

var ConvosModal = React.createClass({

  getInitialState: function () {
    return { convos: null };
  },

  componentDidMount: function () {
    this.listener = MessageStore.addListener(this._updateConvos);
    MessageApiUtil.getAllConvos({ user_id: SessionStore.currentUser().id });
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _updateConvos: function () {
    this.setState({ convos: MessageStore.allConvos() });
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
          <ModalIndexItem unread={unread} open={this.props.open} key={convo.id} person={person} convo={convo}/>
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
