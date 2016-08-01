var React = require('react');
var PropTypes = React.PropTypes;

var SessionStore = require('../../stores/session_store');
var MessageStore = require('../../stores/message_store');

var VisitApiUtil = require('../../util/visit_api_util');
var MessageApiUtil = require('../../util/message_api_util');

var ModalIndexItem = React.createClass({
  getInitialState: function () {
    return {
      latestPreview: MessageStore.getLatestMessage(this.props.convo.id),
      areWeUnread: this.props.unread
    };
  },

  componentDidMount: function () {
    // this.listener = MessageStore.addListener(this._newMessage);
    // this.setState({ areWeUnread: MessageStore.isItUnread(this.props.convo.id) })

    this.pusher = new Pusher('8912b275855afe98c4d3', {
      encrypted: true
    });

    var channel = this.pusher.subscribe('convo_' + this.props.convo.id);
    channel.bind('message_sent', function(data) {
      this._newMessage();
    }.bind(this));

  },

  componentWillUnmount: function () {
    // this.listener.remove();
    this.pusher.unsubscribe('convo_' + this.props.convo.id)
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _goToProfile: function (event) {
    _registerVisit(SessionStore.currentUser(), this.props.person);
    this.context.router.push("profile/" + this.props.person.id);
  },

  _seeMessageDetails: function () {
    if (this.state.areWeUnread) {
      this.setState({ areWeUnread: false })
      MessageStore.readTheMessages(this.props.convo.id, this.props.update);
    }
    this.props.open(this.props.convo);
  },

  _newMessage: function () {
    this.setState({
      latestPreview: MessageStore.getLatestMessage(this.props.convo.id),
      areWeUnread: true
    });
  },

  _shorten: function (string) {
    if (string.length < 18) { return string; }

    var arr = string.split("");

    return arr.slice(0, 18).join("") + "...";
  },

  render: function() {

    console.log("rendering ModalIndexItem:", this.props.convo.id);

    if (!this.state.latestPreview) {
      return (
        <div>
          <li>
            <img onClick={this._goToProfile} src={window.peterImage} />
            <h3>{this.props.person.username}</h3>
          </li>
        </div>
      );
    }

    var hours_ago;
    var milliseconds = new Date() - new Date(this.state.latestPreview.created_at);
    var hours = milliseconds / 3600000;

    if (hours < 1) {
      hours_ago = "less than 1 hour";
    } else {

      hours = Math.floor(hours);

      if (hours === 1){
        hours_ago = "1 hour";
      } else if (hours < 24) {
        hours_ago = Math.floor(hours) + " hours";
      } else if (hours < 48) {
        hours_ago = "1 day";
      } else {
        hours_ago = Math.floor(hours/24) + " days";
      }

    }

    var theClass;
    var theSayer;
    var readness = "readMessage";

    if (this.state.latestPreview.receiver_id === SessionStore.currentUser().id) {
      theClass = "received_message";
      theSayer = "they";
      console.log("CONVO " + this.props.convo.id + ":", this.state.areWeUnread);
      if (this.state.areWeUnread) {
        readness = "unreadMessage";
      }
    } else {
      theClass = "sent_message";
      theSayer = "you";
    }

    return (
      <li className="modal_index_item">
        <img onClick={this._goToProfile} src={this.props.person.image_url} />
        <span onClick={this._seeMessageDetails}>
          <div className={readness} />
          <h3>{this.props.person.username}</h3>
          <p>
            {theSayer} said:&nbsp;
            <span className={theClass}>
              {this._shorten(this.state.latestPreview.body)}
            </span>
          </p>
          <p className="message_timestamp">{hours_ago} ago</p>
        </span>
      </li>
    );
  }

});

// WTF

_registerVisit = function (visitor, visitee) {
  _visitSeekAndDestroy(visitor, visitee);
  VisitApiUtil.createVisit({ visitor_id: visitor.id, visitee_id: visitee.id });
};

_visitSeekAndDestroy = function (visitor, visitee) {
  for (var i = 0; i < visitor.visitees.length; i++) {
    if (visitor.visitees[i].id === visitee.id) {
      VisitApiUtil.deleteVisit({ visitor_id: visitor.id, visitee_id: visitee.id });
      return;
    }
  }
};

module.exports = ModalIndexItem;
