var React = require('react');
var LikeButton = require('../like_button');

var SessionStore = require('../../stores/session_store');
var MatchesStore = require('../../stores/matches_store');

var UserIndexItem = React.createClass({

  render: function () {
    // debugger
    var oldness = (new Date()) - (new Date(this.props.person.birthdate));
    var oldness2 = Math.floor(oldness / 31536000000);

    oldness = MatchesStore.beJudgemental(SessionStore.currentUser(), this.props.person);

    return (
      <li>
        <img src={window.peterImage} />
        <h3>{this.props.person.username}</h3>
        <p>Age {oldness2}</p>
        <p>{oldness} % Match</p>
      </li>
    );
  }

});

module.exports = UserIndexItem;
