class Answer < ActiveRecord::Base

  belongs_to :user
  belongs_to :answer_choice
  has_one :question, through: :answer_choice, source: :question

end
