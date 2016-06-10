var React = require('react');
var LikeButton = require('../like_button');

var SessionStore = require('../../stores/session_store');
var MatchesStore = require('../../stores/matches_store');

var UserIndexItem = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _goToProfile: function (event) {
    _registerVisit(SessionStore.currentUser(), this.props.person);
    this.context.router.push("profile/" + this.props.person.id);
  },

  render: function () {
    // debugger
    var oldness = (new Date()) - (new Date(this.props.person.birthdate));
    var oldness2 = Math.floor(oldness / 31536000000);

    oldness = MatchesStore.beJudgemental(SessionStore.currentUser(), this.props.person);

    return (
      <li className="like_index_item" onClick={this._goToProfile}>
        <img src={this.props.person.image_url} />
        <h3>{this.props.person.username}</h3>
        <p>Age {oldness2}</p>
        <p>{oldness} % Match</p>
      </li>
    );
  }

});

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

module.exports = UserIndexItem;
