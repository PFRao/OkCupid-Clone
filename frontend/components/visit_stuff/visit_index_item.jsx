var React = require('react');
var LikeButton = require('../like_button');

var SessionStore = require('../../stores/session_store');
var MatchesStore = require('../../stores/matches_store');
// var VisitsStore = require('../../stores/visits_store');

var VisitApiUtil = require('../../util/visit_api_util');

var theMonths = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

var VisitIndexItem = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _goToProfile: function (event) {
    _registerVisit(SessionStore.currentUser(), this.props.person);
    this.context.router.push("profile/" + this.props.person.id);
  },

  render: function () {

    var oldness = (new Date()) - (new Date(this.props.person.birthdate));
    var oldness2 = Math.floor(oldness / 31536000000);

    var date;
    date = new Date(this.props.person.last_visit);

    var theM = "am";
    if (date.getHours() >= 12) { theM = "pm"; }

    var hours = (date.getHours() % 12);
    if (hours === 0) { hours = 12; }

    var theColon = ":";
    if (date.getMinutes() < 10) { theColon = ":0"; }

    var time = hours + theColon + date.getMinutes() + theM;

    var timeStamp = theMonths[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " at " + time;

    oldness = MatchesStore.beJudgemental(SessionStore.currentUser(), this.props.person);

    return (
      <li className="like_index_item" onClick={this._goToProfile}>
        <img src={this.props.person.image_url} />
        <h3>{this.props.person.username}</h3>
        <p>Age {oldness2}</p>
        <p>{oldness} % Match</p>
        <p>Last visit: <span className="datDateDoe"> {timeStamp} </span></p>
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

module.exports = VisitIndexItem;
