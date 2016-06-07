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

  render: function () {

    var oldness = (new Date()) - (new Date(this.props.person.birthdate));
    var oldness2 = Math.floor(oldness / 31536000000);

    var date;
    date = new Date(this.props.person.last_visit);

    var hours = (date.getHours() % 12);
    var theM = "am";

    if (date.getHours() >= 12) { theM = "pm"; }
    if (hours === 0) { hours = 12; }

    var theColon = ":";
    if (date.getMinutes() <= 10) { theColon = ":0"; }

    var time = hours + theColon + date.getMinutes() + theM;

    var timeStamp = theMonths[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " at " + time;

    oldness = MatchesStore.beJudgemental(SessionStore.currentUser(), this.props.person);

    return (
      <li>
        <img src={window.peterImage} />
        <h3>{this.props.person.username}</h3>
        <p>Age {oldness2}</p>
        <p>{oldness} % Match</p>
        <p>Last visit was: <span className="datDateDoe"> {timeStamp} </span></p>
      </li>
    );

  }

});

module.exports = VisitIndexItem;
