var React = require('react');
var LikeButton = require('../like_button');

var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;

var SessionStore = require('../../stores/session_store');

var UserIndexItem = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _goToProfile: function (event) {
    this.context.router.push("profile/" + this.props.person.id);
  },

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
      <li onClick={this._goToProfile}>
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
