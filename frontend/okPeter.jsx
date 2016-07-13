//React
var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');
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
//Modals
var QuickConvos = require('./components/nav_stuff/quick_convos');
var QuickMessages = require('./components/nav_stuff/quick_messages');
var ModalStyle = require('./components/modal/modal_style');
//Stores
var SessionStore = require('./stores/session_store');
var MessageStore = require('./stores/message_store');
//Other Stuff
var hashHistory = require('react-router').hashHistory;
var Link = require('react-router').Link;
var SessionApiUtil = require('./util/session_api_util');
var MessageApiUtil = require('./util/message_api_util');

var App = React.createClass({
  getInitialState: function () {
    return {
      convosOpen: false,
      messagesOpen: false,
      menuOpen: false,
      currentConvo: null,
      numberUnread: 0
    }
  },

  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },

  _openMenu: function (e) {
    e.preventDefault();
    this.setState({ menuOpen: true });
  },

  _closeMenu: function (e) {
    // e.preventDefault();
    this.setState({ menuOpen: false });
  },

  _openConvos: function (e) {
    e.preventDefault();
    this.setState({ convosOpen: true });
  },

  _closeConvos: function (e) {
    // e.preventDefault();
    this.setState({ convosOpen: false });
  },

  _openMessages: function (e) {
    // e.preventDefault();
    // this._closeMessages();
    this.setState({ currentConvo: e });
    this.setState({ messagesOpen: true });
  },

  _closeMessages: function (e) {
    // e.preventDefault();
    this.setState({ messagesOpen: false });
  },

  _closeAndReopenMessages: function (e) {
    this.setState({ messagesOpen: false }, function () {
      this._openMessages(e);
    });
  },

  _updateBadge: function (deduction) {

    if (deduction) {
      var temporaryVariable = this.state.numberUnread - 1;
      this.setState({ numberUnread: temporaryVariable });
    } else {
      this.setState({ numberUnread: MessageStore.howManyUnread(SessionStore.currentUser().id) });
    }

  },

  componentDidMount: function () {
    this.listener = MessageStore.addListener(this._updateBadge);
    MessageApiUtil.getAllConvos({ user_id: SessionStore.currentUser().id });

    // add pusher here!
    this.pusher = new Pusher('8912b275855afe98c4d3', {
      encrypted: true
    });

    var channel = this.pusher.subscribe('user_' + SessionStore.currentUser().id);
    channel.bind('notify_user', function(data) {
      this._updateBadge();
    }.bind(this));
    SessionApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {

    // remove pusher here!
    this.pusher.unsubscribe('user_' + SessionStore.currentUser().id)

  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render: function(){

    var candyCorn;
    var swedishFish;

    // onClick={this._openConvos}

    if (SessionStore.isUserLoggedIn()) {

      if (this.state.numberUnread > 0) {
        swedishFish = (<div className="message_notifications">{this.state.numberUnread}</div>);
      } else {
        swedishFish = (<div />);
      }

      candyCorn = [
        <li key={"visitors"}><a href="#/visits">Visitors</a></li>,
        <li key={"likes"}><a href="#/likes">Likes</a></li>,
        <li key={"messages"} onClick={this._openConvos}>
          <a>Messages</a>
          {swedishFish}
        </li>,
        <li className="yer_face" onClick={this._openMenu} key={"person"}><img src={SessionStore.currentUser().image_url} /></li>
      ];
    } else {
      candyCorn = (<li><a href="#">Please log in or sign up!</a></li>);
    }
    return (
      <div>
        <header className="header">
          <nav className="header-nav group">

            <h1 className="header-logo">
              <a href="#/matches"><img src={window.logo} /></a>
            </h1>

            <ul className="header-list group">
              {candyCorn}
            </ul>

          </nav>
        </header>
        {this.props.children}

        <Modal
          className="charles"
          ref="mymodal"
          isOpen={this.state.convosOpen}
          onAfterOpen={this.handleOnAfterOpenModal}
          onRequestClose={this._closeConvos}
          style={ModalStyle}>

          <QuickConvos update={this._updateBadge} open={this._closeAndReopenMessages} close={this._closeConvos} />

        </Modal>

        <Modal
          className="charles"
          ref="mymodal"
          isOpen={this.state.messagesOpen}
          onAfterOpen={this.handleOnAfterOpenModal}
          onRequestClose={this._closeMessages}
          style={ModalStyle}>

          <QuickMessages convo={this.state.currentConvo} close={this._closeMessages} />

        </Modal>

        <Modal
          className="charles"
          ref="mymodal"
          isOpen={this.state.menuOpen}
          onAfterOpen={this.handleOnAfterOpenModal}
          onRequestClose={this._closeMenu}>

          <Main close={this._closeMenu} />

        </Modal>
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
      replace('/matches');
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
