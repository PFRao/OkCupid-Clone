var React = require('react');
var PropTypes = React.PropTypes;

var ConvosModal = require('./convos_modal');

var SessionStore = require('../../stores/session_store');

var moving = false;

var QuickConvos = React.createClass({

  contextTypes: {
    router: PropTypes.object.isRequired
  },

  componentDidMount: function () {
    $("#click_and_brag").mousedown(function (event) {
      theLeft = event.offsetX;
      theTop = event.offsetY;
      moving = true;
    });

    $("body").mouseup(function () {
      moving = false;
    });

    $("body").mousemove(function (event) {

      if (moving) {
        var drag = document.getElementById('braggable');

        console.log();

        var x = event.clientX - theLeft;
        var y = event.clientY - theTop;

        drag.style.left = (x) + "px";
        drag.style.top = (y - 20) + "px";
      }

    });
  },

  _redirection: function (e) {
    e.preventDefault();
    this.props.close()
    this.context.router.push('messages')
  },

  render: function() {
    return (
      <div id="braggable" className="quickModal convosModal">
        <div id="click_and_brag" />
        <h1 className="message_header_thing">Inbox</h1>
        <ConvosModal open={this.props.open} />
        <button className="redirect_modal" onClick={this._redirection}>See all</button>
        <button className="close_modal" onClick={this.props.close}>Close</button>
      </div>
    );
  }

});

module.exports = QuickConvos;
