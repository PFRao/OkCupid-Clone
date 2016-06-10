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

    var tab = this.state.whichTab;

    return (
      <div className="likes_main">

        <button className={"likes_selector" + (tab === "incoming" ? " active" : "")} onClick={this._changeTab} value="incoming">Recently Visited You</button>
        <button className={"likes_selector" + (tab === "outgoing" ? " active" : "")} onClick={this._changeTab} value="outgoing">You Recently Visited</button>

        <br /><br />

        {theTab}
      </div>
    );
  }

});

module.exports = VisitsIndex;
