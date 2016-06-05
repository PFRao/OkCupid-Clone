class Api::AnswersController < ApplicationController

  def create
    @answer = Answer.new(answer_params)

		if @answer.save
			render "api/answers/create"
		else
			render json: @user.errors, status: 422
		end
  end

  private
  def answer_params
    params.require(:answer).permit(:user_id, :weight, :acceptable_choices, :answer_choice_id)
  end

end
