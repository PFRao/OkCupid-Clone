var React = require('react');

var SessionStore = require('../../stores/session_store');
// var VisitsStore = require('../../stores/visits_store');

var VisitApiUtil = require('../../util/visit_api_util');
var SessionApiUtil = require('../../util/session_api_util');

var IncomingVisits = require('./incoming_visits'),
    OutgoingVisits = require('./outgoing_visits');

var VisitsIndex = React.createClass({

  getInitialState: function () {
    SessionApiUtil.fetchCurrentUser();
    return { whichTab: "incoming" };
  },

  _changeTab: function (event) {
    this.setState({ whichTab: event.target.value });
  },

  render: function() {

    var theTab;

    if (this.state.whichTab === "incoming") {
      theTab = (<IncomingVisits theList={SessionStore.currentUser().visitors}/>);
    } else {
      theTab = (<OutgoingVisits theList={SessionStore.currentUser().visitees}/>);
    }

    return (
      <div className="visits_main">

        <button className="visits_selector" onClick={this._changeTab} value="incoming">Recently Visited You</button>
        <button className="visits_selector" onClick={this._changeTab} value="outgoing">You Recently Visited</button>

        <br /><br />

        {theTab}
      </div>
    );
  }

});

module.exports = VisitsIndex;
