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
var UsersIndex = require('./components/match_stuff/users_index');
//Stores
var SessionStore = require('./stores/session_store');
//Other Stuff
var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;
var SessionApiUtil = require('./util/session_api_util');

var App = React.createClass({
  // mixins: [CurrentUserState],

  componentDidMount: function () {
    SessionApiUtil.fetchCurrentUser();
  },

  render: function(){

    var candyCorn;

    if (SessionStore.isUserLoggedIn()) {
      candyCorn = [
        <li key={"visitors"}><a href="#/main">Visitors</a></li>,
        <li key={"likes"}><a href="#/main">Likes</a></li>,
        <li key={"messages"}><a href="#/main">Messages</a></li>,
        <li key={"person"}><a href="#/main">{SessionStore.currentUser().username}</a></li>
      ];
    } else {
      <li>Please log in or sign up!</li>;
    }

    return (
      <div>
        <header className="header">
          <nav className="header-nav group">

            <h1 className="header-logo">
              <a href="#/main">Ok, Peter!</a>
            </h1>

            <ul className="header-list group">
              {candyCorn}
            </ul>

          </nav>
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
      <Route path="matches" component={UsersIndex} />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    routes,
    document.getElementById("allStuffGoesHere")
  );
});
