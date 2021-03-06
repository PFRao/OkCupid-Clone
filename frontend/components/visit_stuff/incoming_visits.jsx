var React = require('react');
var PropTypes = React.PropTypes;

var SessionStore = require('../../stores/session_store');
// var VisitsStore = require('../../stores/visits_store');

var VisitIndexItem = require('./visit_index_item');

var VisitApiUtil = require('../../util/visit_api_util');

var IncomingVisits = React.createClass({

  render: function() {

    var visitIndexItems = this.props.theList.map(function (element, index) {
      return (<VisitIndexItem key={element.id} person={element} />);
    }).reverse();

    return (
      <div>
        <ul>
          {visitIndexItems}
        </ul>
      </div>
    );
  }

});

module.exports = IncomingVisits;
