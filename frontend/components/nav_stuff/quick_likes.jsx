var React = require('react');

var IncomingLikes = require('../like_stuff/incoming_likes');
var SessionStore = require('../../stores/session_store');

var QuickLikes = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _redirection: function (e) {
    // e.preventDefault();
    this.props.close()
    this.context.router.push('likes')
  },

  render: function() {
    return (
      <div className="quickModal">
        Recent Likes:
        <IncomingLikes theList={SessionStore.currentUser().likers}/>
        <button className="redirect_modal" onClick={this._redirection}>See all likes</button>
        <button className="close_modal" onClick={this.props.close}>Close</button>
      </div>
    );
  }

});

module.exports = QuickLikes;
