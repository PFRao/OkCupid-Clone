var React = require('react');
var PropTypes = React.PropTypes;

// var VisitsStore = require('../../stores/visits_store');
var SessionStore = require('../../stores/session_store');

var VisitIndexItem = require('./visit_index_item');

var OutgoingVisits = React.createClass({

  render: function() {

    var rhea = this.props.theList.map(function (element, index) {
      return (<VisitIndexItem key={element.id} person={element} />);
    }).reverse();

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

module.exports = OutgoingVisits;
