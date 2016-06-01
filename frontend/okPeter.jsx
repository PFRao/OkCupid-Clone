//React
var React = require('react');
var ReactDOM = require('react-dom');
//Router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
//Components
var LoginForm = require('./components/login_form');
var SignupForm = require('./components/signup_form');
var Main = require('./components/main');
//Mixins
// var CurrentUserState = require('./mixins/current_user_state');
//Other Stuff
var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;

var App = React.createClass({
  // mixins: [CurrentUserState],

  render: function(){

    return (
      <div>
        <header>
          <h1>Ok, Peter!</h1>
        </header>
        {this.props.children}
      </div>
    );

  }

});

routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SignupForm} />
      <Route path="login" component={LoginForm} />
      <Route path="main" component={Main} />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    routes,
    document.getElementById("allStuffGoesHere")
  );
});
