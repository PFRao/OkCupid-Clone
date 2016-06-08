var React = require('react');
var PropTypes = React.PropTypes;

var MessageIndexItem = require('./message_index_item');
var SessionStore = require('../../stores/session_store');
var MessageStore = require('../../stores/message_store');

var MessageApiUtil = require('../../util/message_api_util');

var MessageIndex = React.createClass({

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

    if (this.state.convos) {

      board = this.state.convos.map(function (convo) {

        if (SessionStore.currentUser().id === convo.user.id) {
          person = convo.user2;
        } else {
          person = convo.user;
        }

        return (
          <MessageIndexItem key={convo.id} person={person} convo={convo}/>
        );

      });

    } else {

      return (<p>You don't have any messages... yet!</p>);

    }

    return (
      <div>
        <h2>Your conversations</h2>
        <ul>
          {board}
        </ul>
      </div>
    );
  }

});

module.exports = MessageIndex;
