var React = require('react');

var SessionStore = require('../../stores/session_store');
// var VisitsStore = require('../../stores/visits_store');

var VisitApiUtil = require('../../util/visit_api_util');

var IncomingVisits = require('./incoming_visits'),
    OutgoingVisits = require('./outgoing_visits');

var VisitsIndex = React.createClass({

  getInitialState: function () {
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
        <p className="visits_poem">
        Remember what we used to do, <br />
        And how it used to be? <br />
        I always knew to count on you, <br />
        And you, depend on me. <br />
        I guess we drifted out of touch - <br />
        But that's the thing, they say <br />
        It's not that the spark can <span className="poem_italics">end</span>, as such. <br />
        It simply... slips away... <br /><br />
        DON'T LET THAT HAPPEN TO YOU, {SessionStore.currentUser().username}!
        </p>

        <br /><br />

        <button className="go_home" onClick={this._changeTab} value="incoming">Recently Visited You</button>
        <button className="go_home" onClick={this._changeTab} value="outgoing">You Recently Visited</button>

        <br /><br />

        {theTab}
      </div>
    );
  }

});

module.exports = VisitsIndex;
