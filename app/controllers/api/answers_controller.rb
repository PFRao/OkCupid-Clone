class Api::AnswersController < ApplicationContoller

  def create

  end

  private
  def answer_params
    params.require(:answer).permit(:user_id, :weight, :acceptable_choices, :answer_id)
  end

end
