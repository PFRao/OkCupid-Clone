var React = require('react');
var LikeApiUtil = require('../util/like_api_util');

var SessionStore = require('../stores/session_store');

var LikeButton = React.createClass({
  getInitialState: function () {
    return { status: SessionStore.doesCurrentUserLike(this.props.person) };
  },

  _getClickedLike: function (event) {
    var louis = { liker_id: SessionStore.currentUser().id, likee_id :this.props.person.id };
    LikeApiUtil.likeSomeone(louis);
  },

  _getClickedUnlike: function (event) {
    var louis = { liker_id: SessionStore.currentUser().id, likee_id :this.props.person.id };
    LikeApiUtil.unlikeSomeone(louis);
  },

  _toggleThis: function () {
    if (this.state.status) {
      this._getClickedUnlike();
      this.setState({ status: false });
    } else {
      this._getClickedLike();
      this.setState({ status: true });
    }
  },

  render: function() {

    var humphrey;

    if (this.state.status) {
      humphrey = "Unlike";
    } else {
      humphrey = " Like ";
    }

    return (
      <button className="like_button" onClick={this._toggleThis}>
        {humphrey}
      </button>
    );

  }

});

module.exports = LikeButton;
