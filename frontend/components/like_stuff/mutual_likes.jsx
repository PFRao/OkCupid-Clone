var React = require('react');
var PropTypes = React.PropTypes;

var LikeIndexItem = require('./like_index_item');

var MutualLikes = React.createClass({

  render: function() {

    var emu = _detectMutualLikes(this.props.theLikers, this.props.theLikees);

    var cassowary = emu.map(function (element, index) {
      return (element);
    });

    return (
      <div>
        <h1 className="like_title">WHO LIKES WHO??</h1>
        <ul>
          {cassowary}
        </ul>
      </div>
    );

  }

});

_detectMutualLikes = function (likers, likees) {
  var mutuals = [];

  likers.forEach(function (theDude, theIndex) {
    if (_mutualLikeScanner(theDude, likees)) {
      mutuals.push(<LikeIndexItem key={theDude.id} person={theDude} />);
    }
  });

  return mutuals;
};

_mutualLikeScanner = function (user, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === user.id) { return true; }
  }
  return false;
};

module.exports = MutualLikes;
