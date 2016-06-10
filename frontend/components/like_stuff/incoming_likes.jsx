var React = require('react');
var PropTypes = React.PropTypes;

var LikeIndexItem = require('./like_index_item');

var IncomingLikes = React.createClass({

  render: function() {

    var peacock = this.props.theList.map(function (element, index) {
      return (<LikeIndexItem key={element.id} person={element} />);
    });

    return (
      <div>
        <ul>
          {peacock}
        </ul>
      </div>
    );
  }

});

module.exports = IncomingLikes;
