var React = require('react');

var IncomingVisits = require('../visit_stuff/incoming_visits');
var SessionStore = require('../../stores/session_store');

var QuickVisitors = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _redirection: function (e) {
    e.preventDefault();
    this.props.close()
    this.context.router.push('visits')
  },

  render: function() {
    return (
      <div className="quickModal visitorModal">
        Recent Visitors:
        <IncomingVisits theList={SessionStore.currentUser().visitors}/>
        <button className="redirect_modal" onClick={this._redirection}>See all visitors</button>
        <button className="close_modal" onClick={this.props.close}>Close</button>
      </div>
    );
  }

});

module.exports = QuickVisitors;
