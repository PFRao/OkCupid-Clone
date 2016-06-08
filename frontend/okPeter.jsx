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
var Questions = require('./components/question_stuff/questions');
var LikesIndex = require('./components/like_stuff/likes_index');
var VisitsIndex = require('./components/visit_stuff/visits_index');
var UserProfile = require('./components/profile_stuff/user_profile');
var MessageIndex = require('./components/message_stuff/message_index');
var MessageDetail = require('./components/message_stuff/message_detail');
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

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  _goToProfile: function () {
    this.context.router.push("profile/" + SessionStore.currentUser().id);
  },

  render: function(){

    var candyCorn;

    if (SessionStore.isUserLoggedIn()) {
      candyCorn = [
        <li key={"visitors"}><a href="#/visits">Visitors</a></li>,
        <li key={"likes"}><a href="#/likes">Likes</a></li>,
        <li key={"messages"}><a href="#/messages">Messages</a></li>,
        <li className="yer_face" onClick={this._goToProfile} key={"person"}><img src={window.peterImage} /></li>
      ];
    } else {
      <li>Please log in or sign up!</li>;
    }

    return (
      <div>
        <header className="header">
          <nav className="header-nav group">

            <h1 className="header-logo">
              <a href="#/main">LMAOPeter</a>
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

// <Route path="login" component={LoginForm} />
routes = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SignupForm} onEnter={ _ensureLoggedOut }/>
      <Route path="main" component={Main} onEnter={ _ensureLoggedIn } />
      <Route path="matches" component={UsersIndex} onEnter={ _ensureLoggedIn } />
      <Route path="questions" component={Questions} onEnter={ _ensureLoggedIn } />
      <Route path="likes" component={LikesIndex} onEnter={ _ensureLoggedIn } />
      <Route path="visits" component={VisitsIndex} onEnter={ _ensureLoggedIn } />
      <Route path="profile/:user_id" component={UserProfile} onEnter={ _ensureLoggedIn } />
      <Route path="messages" component={MessageIndex} onEnter={ _ensureLoggedIn } />
      <Route path="messages/:convo_id" component={MessageDetail} onEnter={ _ensureLoggedIn } />
    </Route>
  </Router>
);

function _ensureLoggedIn(nextState, replace, asyncDoneCallback) {
  // Router is in the process of entering a route.
  // Will wait for us to call the `asyncDoneCallback`
  // before it actually enters the route (and renders onto the page)
  //
  // Let's check if user is signed in, if they are, we can just call
  // the asyncDoneCallback and the Router will enter the Route normally,
  // else, if user is NOT signed in, let's call the `replace` argument
  // to instead redirect the user to the login route/component.
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
    // redirectIfNotLoggedIn();
  }

  function redirectIfNotLoggedIn() {
    if (!SessionStore.isUserLoggedIn()) {
      // `replace` is like a redirect. It replaces the current entry
      // into the history (and the hashFragment), so the Router is forced
      // to re-route.
      replace('/');
    }

    // The `asyncDoneCallback` is the React Router's way of telling us
    // "let me know when you're done doing any async stuff, and I'll see
    // if I render the original Route or navigate to another one. In the
    // meantime, I'll just wait and not do anything".
    asyncDoneCallback();
  }
}

function _ensureLoggedOut(nextState, replace, asyncDoneCallback) {
  // Router is in the process of entering a route.
  // Will wait for us to call the `asyncDoneCallback`
  // before it actually enters the route (and renders onto the page)
  //
  // Let's check if user is signed in, if they are, we can just call
  // the asyncDoneCallback and the Router will enter the Route normally,
  // else, if user is NOT signed in, let's call the `replace` argument
  // to instead redirect the user to the login route/component.
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedOut();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedOut);
  }

  function redirectIfNotLoggedOut() {
    if (SessionStore.isUserLoggedIn()) {
      // `replace` is like a redirect. It replaces the current entry
      // into the history (and the hashFragment), so the Router is forced
      // to re-route.
      replace('/main');
    }

    // The `asyncDoneCallback` is the React Router's way of telling us
    // "let me know when you're done doing any async stuff, and I'll see
    // if I render the original Route or navigate to another one. In the
    // meantime, I'll just wait and not do anything".
    asyncDoneCallback();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    routes,
    document.getElementById("allStuffGoesHere")
  );
});
