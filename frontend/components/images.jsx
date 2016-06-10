var React = require('react');
var PropTypes = React.PropTypes;

var Images = React.createClass({
  getInitialState: function () {
    return { images: [] };
  },

  componentDidMount: function () {
    $.get("api/images", function (images) {
      this.setState({ images: images });
    }.bind(this));
  },

  postImage: function (url) {
    var img = { url: url };
    $.ajax({
      method: 'POST',
      url: 'api/images',
      dataType: 'json',
      data: { image: img },
      success: function (image) {
        var images = this.state.images;
        images.push(image);
        this.setState({ images: images });
      }.bind(this)
    });
  },

  render: function() {

    return (
      <div />
    );
  }

});

module.exports = Images;
