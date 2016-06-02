var React = require('react');

var UserIndexItem = React.createClass({
  render: function () {
    return (
      <li>
        {this.props.person.username}
        {this.props.rating}
      </li>
    );
  }
});

module.exports = UserIndexItem;
