var React = require('react');
var PropTypes = React.PropTypes;

var LikeIndexItem = require('./like_index_item');

var OutgoingLikes = React.createClass({

  render: function() {

    var penguin = this.props.theList.map(function (element, index) {
      return (<LikeIndexItem key={element.id} person={element} />);
    });

    return (
      <div>
        <ul>
          {penguin}
        </ul>
      </div>
    );

  }

});

module.exports = OutgoingLikes;
