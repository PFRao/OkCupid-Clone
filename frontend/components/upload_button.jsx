var React = require('react');
var PropTypes = React.PropTypes;

// need user prop

var UploadButton = React.createClass({
  getInitialState: function () {
    return { image: this.props.user.image_url };
  },

  _postImage: function (url) {
    var img = {
      image_url: url ,
      id: this.props.user.id
    };
    $.ajax({
      method: 'PATCH',
      url: 'api/user',
      dataType: 'json',
      data: { user: img },
      success: function (user) {
        this.setState({ image: user.image_url });
      }.bind(this)
    });
  },

  _upload: function (event) {
    event.preventDefault();

    cloudinary.openUploadWidget(window.cloudinary_options, function (error, images) {
      if (error === null) {
        // successful upload
        this._postImage(images[0].url);
      }
    }.bind(this));
  },

  render: function() {

    return (
      <button onClick={this._upload}>
        <img className="main_profile_photo" src={this.state.image} />
      </button>
    );
  }

});

module.exports = UploadButton;
