var React = require('react');

var LikesStore = require('../../stores/likes_store');
var SessionStore = require('../../stores/session_store');

var IncomingLikes = require('./incoming_likes'),
    OutgoingLikes = require('./outgoing_likes'),
    MutualLikes = require('./mutual_likes');

var LikesIndex = React.createClass({

  getInitialState: function () {
    return { whichTab: "incoming" };
  },

  _changeTab: function (event) {
    this.setState({ whichTab: event.target.value });
  },

  render: function() {

    var theTab;

    if (this.state.whichTab === "incoming") {
      theTab = (<IncomingLikes theList={SessionStore.currentUser().likers}/>);
    } else if (this.state.whichTab === "outgoing") {
      theTab = (<OutgoingLikes theList={SessionStore.currentUser().likees}/>);
    } else {
      theTab = (<MutualLikes theLikers={SessionStore.currentUser().likers} theLikees={SessionStore.currentUser().likees}/>);
    }

    return (
      <div className="likes_main">
        Likes are natural, Likes are good. Not everyone gets them, but everyone should.

        <br /><br />

        <button className="go_home" onClick={this._changeTab} value="incoming">Who Likes You</button>
        <button className="go_home" onClick={this._changeTab} value="outgoing">Who You Like</button>
        <button className="go_home" onClick={this._changeTab} value="mutual">Mutual Likes</button>

        <br /><br />

        {theTab}
      </div>
    );
  }

});

module.exports = LikesIndex;
