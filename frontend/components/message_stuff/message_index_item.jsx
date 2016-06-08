var React = require('react');
var PropTypes = React.PropTypes;

var MessageIndexItem = React.createClass({
  getInitialState: function () {
    return { latestPreview: null };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _goToProfile: function (event) {
    _registerVisit(SessionStore.currentUser(), this.props.person);
    this.context.router.push("profile/" + this.props.person.id);
  },

  componentDidMount: function () {

  },

  render: function() {
    return (
      <div>
        <li>
          <img onClick={this._goToProfile} src={window.peterImage} />
          <h3>{this.props.person.username}</h3>

        </li>
      </div>
    );
  }

});

_registerVisit = function (visitor, visitee) {
  _visitSeekAndDestroy(visitor, visitee);
  VisitApiUtil.createVisit({ visitor_id: visitor.id, visitee_id: visitee.id });
};

_visitSeekAndDestroy = function (visitor, visitee) {
  for (var i = 0; i < visitor.visitees.length; i++) {
    if (visitor.visitees[i].id === visitee.id) {
      VisitApiUtil.deleteVisit({ visitor_id: visitor.id, visitee_id: visitee.id });
      return;
    }
  }
};

module.exports = MessageIndexItem;
