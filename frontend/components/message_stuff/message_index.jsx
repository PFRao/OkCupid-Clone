var React = require('react');
var PropTypes = React.PropTypes;

var MessageIndexItem = require('./message_index_item');
var SessionStore = require('../../stores/session_store');
var MessageStore = require('../../stores/message_store');

var MessageApiUtil = require('../../util/message_api_util');

var MessageIndex = React.createClass({

  getInitialState: function () {
    return {};
  },

  componentDidMount: function () {
    MessageApiUtil.getAllConvos({ user_id: SessionStore.currentUser().id });
  },

  render: function() {
    return (
      <div>
        <h2>Your conversations</h2>
        <ul>
          {}
        </ul>
      </div>
    );
  }

});

module.exports = MessageIndex;
