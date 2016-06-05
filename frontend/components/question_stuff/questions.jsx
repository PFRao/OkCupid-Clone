var React = require('react');
var ApiUtil = require('../../util/api_util');

var QuestionStore = require('../../stores/question_store');
var SessionStore = require('../../stores/session_store');

var Questions = React.createClass({

  getInitialState: function () {
    return {
      question: QuestionStore.newQuestion(),
      theChoice: null,
      thePreferences: [],
      theWeight: 1
    };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    this.listener = QuestionStore.addListener(this._selectQuestion);

    ApiUtil.fetchAllUserQuestions(SessionStore.currentUser());
    ApiUtil.fetchAnotherQuestion();
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  _handleAnswer: function (event) {
    event.preventDefault();
    if (this.state.theChoice || this.state.thePreferences) {

    }
    ApiUtil.fetchAnotherQuestion();
  },

  _selectQuestion: function () {
    this.setState({ question: QuestionStore.newQuestion() });
  },

  _backItUp: function () {
    this.context.router.push("main");
  },

  _changeChoice: function (event) {
    this.setState({ theChoice: parseInt(event.target.value) });
  },

  _changePreferences: function (event) {
    var temp;

    if (this.state.thePreferences.includes(parseInt(event.target.value))) {
      temp = _remove(this.state.thePreferences, parseInt(event.target.value));

      this.setState({ thePreferences: _remove(this.state.thePreferences, parseInt(event.target.value)) });
    } else {
      temp = this.state.thePreferences.concat([parseInt(event.target.value)]);

      this.setState({ thePreferences: temp });
    }

  },

  _skip: function () {
    ApiUtil.fetchAnotherQuestion();
  },

  render: function() {

    var stuffToRender;

    if (this.state.question) {
      // console.log("current question:", this.state.question.description);
      // console.log("current answer:", this.state.theChoice);
      // console.log(this.state.thePreferences);

      stuffToRender = (
        <div>
          <form onSubmit={this._handleAnswer}>

            <h4>{this.state.question.description}</h4>
            {
              this.state.question.answer_choices.map(function (thing, index) {
                return (<label key={index}>
                  <input type="radio" value={thing.id} checked={this.state.theChoice === thing.id} onChange={this._changePreferences} />
                  {thing.body}
                  <br />
                  </label>
                );
              }.bind(this))
            }

            <br />

            <h4>Which answers would you want to see from your matches?</h4>
            {
              this.state.question.answer_choices.map(function (thing, index) {
                return (<label key={index}>
                  <input type="checkbox" value={thing.id} checked={this.state.thePreferences.includes(thing.id)} onChange={this._changePreferences} />
                  {thing.body}
                  <br />
                  </label>
                );
              }.bind(this))
            }

            <br />
            <button className="go_home">Yes, that is my final answer</button>
          </form>
          <button onClick={this._skip} className="go_home">Skip this question</button>
        </div>
      );
    } else {
      stuffToRender = (
        <div className="no_more_questions">
          You've answered every question we've got, you crazy sonuvagun.<br />
        </div>
      );
    }

    return (
      <div>
        {stuffToRender}
        <button className="go_home" onClick={this._backItUp}>Ok, I'm done</button>
      </div>
    );
  }

});

var _remove = function (theList, theThing) {
  for (var i = 0; i < theList.length; i++) {
    if (theList[i] === theThing) { theList.splice(i, 1); }
  }

  return theList;
};

module.exports = Questions;
