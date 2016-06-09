var React = require('react');
var PropTypes = React.PropTypes;

var ProfileField = require('./profile_field');

var ProfileInfo = React.createClass({

  render: function() {
    return (
      <div className="question_pane">
        <p className="profile_header">My Self-Summary:</p>
        <br />
        <ProfileField
          fieldName="self_summary" fieldContents={this.props.theprops.info.self_summary}
          canWeEdit={this.props.isThisUs}
          theUserId={this.props.theprops.user.id} />
        <br />

        <p className="profile_header">What I'm doing with my life:</p>
        <br />
          <ProfileField
            fieldName="do_with_life" fieldContents={this.props.theprops.info.do_with_life}
            canWeEdit={this.props.isThisUs}
            theUserId={this.props.theprops.user.id} />
        <br />

        <p className="profile_header">I'm really good at:</p>
        <br />
          <ProfileField
            fieldName="real_good_at" fieldContents={this.props.theprops.info.real_good_at}
            canWeEdit={this.props.isThisUs}
            theUserId={this.props.theprops.user.id} />
        <br />

        <p className="profile_header">The first thing people usually notice about me:</p>
        <br />
          <ProfileField
            fieldName="first_thing" fieldContents={this.props.theprops.info.first_thing}
            canWeEdit={this.props.isThisUs}
            theUserId={this.props.theprops.user.id} />
        <br />

        <p className="profile_header">My favorite things:</p>
        <br />
          <ProfileField
            fieldName="favorites" fieldContents={this.props.theprops.info.favorites}
            canWeEdit={this.props.isThisUs}
            theUserId={this.props.theprops.user.id} />
        <br />

        <p className="profile_header">The six things I could never do without:</p>
        <br />
          <ProfileField
            fieldName="six_things" fieldContents={this.props.theprops.info.six_things}
            canWeEdit={this.props.isThisUs}
            theUserId={this.props.theprops.user.id} />
        <br />

        <p className="profile_header">I spend a lot of time thinking about:</p>
        <br />
          <ProfileField
            fieldName="think_about" fieldContents={this.props.theprops.info.think_about}
            canWeEdit={this.props.isThisUs}
            theUserId={this.props.theprops.user.id} />
        <br />

        <p className="profile_header">On a typical friday, I am:</p>
        <br />
          <ProfileField
            fieldName="typical_friday" fieldContents={this.props.theprops.info.typical_friday}
            canWeEdit={this.props.isThisUs}
            theUserId={this.props.theprops.user.id} />
        <br />

        <p className="profile_header">You should message me if:</p>
        <br />
          <ProfileField
            fieldName="message_if" fieldContents={this.props.theprops.info.message_if}
            canWeEdit={this.props.isThisUs}
            theUserId={this.props.theprops.user.id} />
        <br />
      </div>
    );
  }

});

module.exports = ProfileInfo;
