var React = require('react');

var ProfileApiUtil = require('../../util/profile_api_util');
var ProfileStore = require('../../stores/profile_store');

var ProfileField = React.createClass({
  getInitialState: function () {
    return {
      areWeOpen: false,
      contents: this.props.fieldContents
    };
  },

  // this.props.fieldName
  // this.props.canWeEdit
  // this.props.theUserId

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      areWeOpen: false,
      contents: this.props.fieldContents
    });
  },

  _edit: function (event) {
    this.setState({ areWeOpen: true });
  },

  _doneEditing: function (event) {
    event.preventDefault();

    var theWord = this.props.fieldName;
    var profileUpdate = {};

    profileUpdate[theWord] = this.state.contents;

    ProfileApiUtil.updateProfile(
      this.props.theUserId,
      profileUpdate
    );

    this.setState({ areWeOpen: false });
  },

  _changeContents: function (event) {
    this.setState({ contents: event.target.value });
  },

  render: function() {

    var editable;

    if (this.props.canWeEdit) {
      editable = (<button className="edit_profile_button" onClick={this._edit}>EDIT</button>);
    }

    if (this.state.areWeOpen) {
      return (
        <form onSubmit={this._doneEditing}>
          <textarea className="profile_edit" value={this.state.contents} onChange={this._changeContents} />
          <button className="edit_profile_button">DONE</button>
        </form>
      );
    } else {
      return (
        <div>
          <p className="profile_words">{this.state.contents}</p>
          {editable}
        </div>
      );
    }

  }

});

module.exports = ProfileField;
