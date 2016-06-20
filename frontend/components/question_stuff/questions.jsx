var React = require('react');
var ApiUtil = require('../../util/api_util');
var UserApiUtil = require('../../util/user_api_util');

var QuestionStore = require('../../stores/question_store');
var SessionStore = require('../../stores/session_store');

var _values = {};

var Questions = React.createClass({

  getInitialState: function () {
    return {
      question: QuestionStore.newQuestion(),
      theChoice: "nothing yet",
      thePreferences: [],
      theWeight: 0
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
    var formAnswer = {};
    var formData = {};
    var demPrefsTho;

    if (this.state.theChoice || this.state.thePreferences) {

      this._getRelevantValues();
      demPrefsTho = this.state.thePreferences.map(function (thingy) {
        return _values[thingy];
      });

      formAnswer.answer_choice_id = this.state.theChoice;
      formAnswer.acceptable_choices = JSON.stringify(this.state.thePreferences);
      formAnswer.weight = this.state.theWeight;
      formAnswer.user_id = SessionStore.currentUser().id;

      formData.category = this.state.question.answer_choices[0].category;
      formData.theChoice = _values[this.state.theChoice] * this.state.theWeight;
      formData.thePref = _average(demPrefsTho) * this.state.theWeight;

    }

    this._resetForm();

    this._answerTheQuestion(formAnswer);
    this._updateTheUser(formData);
    ApiUtil.fetchAnotherQuestion();
  },

  _resetForm: function () {
    this.setState({
      theChoice: null,
      thePreferences: [],
      theWeight: 0
    });
    _values = {};
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

  _changeWeight: function (event) {
    this.setState({ theWeight: parseInt(event.target.value) });
  },

  _skip: function () {
    ApiUtil.fetchAnotherQuestion();
  },

  _getRelevantValues: function () {
    for (var i = 0; i < this.state.question.answer_choices.length; i++) {
      _values[this.state.question.answer_choices[i].id] = this.state.question.answer_choices[i].value;
    }
  },

  _answerTheQuestion: function (formAnswer) {
    ApiUtil.answerQuestion(formAnswer);
  },

  _updateTheUser: function (formData) {
    var theSendUp = SessionStore.currentUserPersonality();

    theSendUp.you[formData.category] += formData.theChoice;
    theSendUp.them[formData.category] += formData.thePref;

    UserApiUtil.update({ id: SessionStore.currentUser().id, personality: JSON.stringify(theSendUp) });
  },

  render: function() {

    var stuffToRender;

    if (this.state.question) {

      stuffToRender = (
        <div className="main_question_area">
          <form onSubmit={this._handleAnswer}>

            <div className="part1">
            <h4>{this.state.question.description}</h4>
            {
              this.state.question.answer_choices.map(function (thing, index) {
                return (<label key={index}>
                  <input type="radio" value={thing.id} checked={this.state.theChoice === thing.id} onChange={this._changeChoice} />
                  {thing.body}
                  <br />
                  </label>
                );
              }.bind(this))
            }
            </div>

            <div className="part1">
            <h4>Which answers would you want to see from your ideal match?</h4>
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
            </div>

            <br />

          </form>
          <div className="part2">
          <h4>How important is this question to you?</h4>
          Don't give a shit
          <input
            type ="range"
            min ="0"
            max="10"
            step =".1"
            value ={this.state.theWeight}
            onChange={this._changeWeight} />
          Absolute dealbreaker
          </div>
          <br />
        </div>
      );
    } else {
      stuffToRender = (
        <div className="no_more_questions">
          You've answered every question we've got. All of your secrets have been submitted to the NSA database. Thank you for your participation, citizen.<br />
        </div>
      );
    }

    return (
      <div>
        {stuffToRender}
        <br /><br />
        <button onClick={this._handleAnswer} className="question_button">Submit this answer</button>
        <button onClick={this._skip} className="question_button">Skip this question for now</button>
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

var _average = function (theArray) {
  if (theArray.length === 0) { return 0; }

  var sum = 0;
  for( var i = 0; i < theArray.length; i++ ){
    sum += theArray[i];
  }

  return sum/theArray.length;
};

module.exports = Questions;

// <form>
//   <h4>How important is this question to you?</h4>
//
//   <label>
//     <input type="radio" value={0} checked={this.state.theWeight === 0} onChange={this._changeWeight} />
//     I honestly don't give a shit
//     <br />
//   </label>
//
//   <label>
//     <input type="radio" value={1} checked={this.state.theWeight === 1} onChange={this._changeWeight} />
//     I care a little bit, bit it's really no big deal, you know?
//     <br />
//   </label>
//
//   <label>
//     <input type="radio" value={2} checked={this.state.theWeight === 2} onChange={this._changeWeight} />
//     This is something that I would definitely consider when selecting a mate
//     <br />
//   </label>
//
//   <label>
//     <input type="radio" value={10} checked={this.state.theWeight === 10} onChange={this._changeWeight} />
//     This is basically a dealbreaker
//     <br />
//   </label>
// </form>
