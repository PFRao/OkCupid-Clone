var React = require('react');
var PropTypes = React.PropTypes;

var ConvosModal = require('./convos_modal');

var SessionStore = require('../../stores/session_store');

var QuickConvos = React.createClass({

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  _redirection: function (e) {
    e.preventDefault();
    this.props.close()
    this.context.router.push('messages')
  },

  render: function() {
    return (
      <div className="quickModal convosModal">
        <ConvosModal open={this.props.open} />
        <button className="redirect_modal" onClick={this._redirection}>See all</button>
        <button className="close_modal" onClick={this.props.close}>Close</button>
      </div>
    );
  }

});

module.exports = QuickConvos;
