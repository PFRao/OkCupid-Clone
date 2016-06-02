var React = require('react');

var UserIndexItem = React.createClass({

  render: function () {
    // debugger
    var oldness = (new Date()) - (new Date(this.props.person.birthdate));
    return (
      <li>
        <img src={window.peterImage} />
        <h3>{this.props.person.username}</h3>
        <p>Age {oldness}</p>
        <p>{this.props.rating} % Match</p>
      </li>
    );
  }

});

module.exports = UserIndexItem;
