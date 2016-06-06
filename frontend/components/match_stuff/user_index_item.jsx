var React = require('react');
var LikeButton = require('../like_button');

var SessionStore = require('../../stores/session_store');

var UserIndexItem = React.createClass({

  render: function () {
    // debugger
    var oldness = (new Date()) - (new Date(this.props.person.birthdate));
    var oldness2 = Math.floor(oldness / 31536000000);

    if (SessionStore.isCurrentUserLikedBy(this.props.person)) {
      oldness = (<p>This person likes you!</p>);
    } else {
      oldness = (<p></p>);
    }

    return (
      <li>
        <img src={window.peterImage} />
        <h3>{this.props.person.username}</h3>
        <p>Age {oldness2}</p>
        <p>{this.props.rating} % Match</p>
        {oldness}
        <LikeButton person={this.props.person}/>
      </li>
    );
  }

});

module.exports = UserIndexItem;
