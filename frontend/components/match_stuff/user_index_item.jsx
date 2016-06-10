var React = require('react');
var LikeButton = require('../like_button');

var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;

var SessionStore = require('../../stores/session_store');

var VisitApiUtil = require('../../util/visit_api_util');

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

    if (SessionStore.isCurrentUserLikedBy(this.props.person)) {
      oldness = (<p className="list_o_matches">This person likes you!</p>);
    } else {
      oldness = (<p></p>);
    }

    return (

      <li>
        <span onClick={this._goToProfile}>
          <img src={this.props.person.image_url} />
          <h3>{this.props.person.username}</h3>
          <p>Age {oldness2}</p>
          <p>{this.props.rating} % Match</p>
          {oldness}
        </span>
        <LikeButton person={this.props.person}/>
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
