var React = require('react');

var UserIndexItem = React.createClass({

  render: function () {
    // debugger
    var oldness = (new Date()) - (new Date(this.props.person.birthdate));
    var oldness2 = Math.floor(oldness / 31536000000);
    return (
      <li>
        <img src={window.peterImage} />
        <h3>{this.props.person.username}</h3>
        <p>Age {oldness2}</p>
        <p>{this.props.rating} % Match</p>
      </li>
    );
  }

});

module.exports = UserIndexItem;
