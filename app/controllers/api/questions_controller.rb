require 'byebug'

class Api::QuestionsController < ApplicationController

  def index
    @questions = current_user.questions
    render "api/questions/index"
  end

  def new
    @questions = (Question.all - current_user.questions).shuffle()
    if @questions.length > 0
      @question = @questions[0]
      render "api/questions/show"
    else
      render json: nil
    end
  end

end
