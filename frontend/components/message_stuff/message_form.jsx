var React = require('react');
var PropTypes = React.PropTypes;

var MessageStore = require('../../stores/message_store');

var MessageApiUtil = require('../../util/message_api_util');

// WE NEED THE FOLLOWING PROPS:
// SENDER
// RECEIVER
// CONVO_ID

var MessageForm = React.createClass({
  getInitialState: function () {
    return { contents: "" };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _redirectToConvo: function (convo_id) {
    this.context.router.push("messages/" + convo_id);
  },

  _handleSubmit: function (event) {
    event.preventDefault();

    if (this.props.convo_id) {

      MessageApiUtil.createMessage({
        convo_id: this.props.convo_id,
        sender_id: this.props.sender.id,
        receiver_id: this.props.receiver.id,
        body: this.state.contents
      });

    } else {

      MessageApiUtil.createConversation({
        user_id: this.props.sender.id,
        user2_id: this.props.receiver.id
      }, this.state.contents, this._redirectToConvo);

    }

    this.setState({ contents: "" });
  },

  _changeContents: function (event) {
    this.setState({ contents: event.target.value });
  },

  render: function() {
    return (
      <form onSubmit={this._handleSubmit}>
        <p className="datDateDoe">Message {this.props.receiver.username}</p>
        <textarea className="new_message_text" value={this.state.contents} onChange={this._changeContents} />
        <button className="submit_that_message">Submit</button>
      </form>
    );
  }

});

module.exports = MessageForm;
