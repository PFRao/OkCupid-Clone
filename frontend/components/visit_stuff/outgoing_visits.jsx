var React = require('react');
var PropTypes = React.PropTypes;

var VisitsStore = require('../../stores/visits_store');

var VisitIndexItem = require('./visit_index_item');

var VisitApiUtil = require('../../util/visit_api_util');

var OutgoingVisits = React.createClass({

  render: function() {

    VisitApiUtil.getAllVisits(SessionStore.currentUser().id, "outgoing");

    var theVisit;

    var rhea = this.props.theList.map(function (element, index) {
      theVisit = _find_visit(element.id);

      return (<VisitIndexItem key={element.id} person={element} time={theVisit.updated_at} />);
    });

    return (
      <div>
        <h1 className="visit_title">People whom you have recently visited:</h1>
        <ul>
          {rhea}
        </ul>
      </div>
    );

  }

});

_find_visit = function (visiteeId) {
  var outgoingVisits = VisitsStore.outgoing();
  for (var i = 0; i < outgoingVisits.length; i++) {
    console.log(outgoingVisits[i].visitee_id, visiteeId);
    if(outgoingVisits[i].visitee_id == visiteeId) {
      return outgoingVisits[i];
    }
  }
};

module.exports = OutgoingVisits;
