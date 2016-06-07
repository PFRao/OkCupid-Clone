var React = require('react');
var PropTypes = React.PropTypes;

var SessionStore = require('../../stores/session_store');
var VisitsStore = require('../../stores/visits_store');

var VisitIndexItem = require('./visit_index_item');

var VisitApiUtil = require('../../util/visit_api_util');

var IncomingVisits = React.createClass({

  render: function() {

    VisitApiUtil.getAllVisits(SessionStore.currentUser().id, "incoming");

    var theVisit;

    var kiwi = this.props.theList.map(function (element, index) {
      theVisit = _find_visit1(element.id);
      return (<VisitIndexItem key={element.id} person={element} time={theVisit.updated_at} />);
    });

    return (
      <div>
        <h1 className="visit_title">People who recently visited you:</h1>
        <ul>
          {kiwi}
        </ul>
      </div>
    );
  }

});

_find_visit1 = function (visitorId) {
  debugger
  var incomingVisits = VisitsStore.incoming();
  for (var i = 0; i < incomingVisits.length; i++) {
    console.log(incomingVisits[i].visitor_id, visitorId);
    if(incomingVisits[i].visitor_id == visitorId) {
      return incomingVisits[i];
    }
  }
};

module.exports = IncomingVisits;
