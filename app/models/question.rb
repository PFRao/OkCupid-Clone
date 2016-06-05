class Question < ActiveRecord::Base

  has_many :answer_choices
  has_many :submitted_answers, through: :answer_choices, source: :answer_choice
  has_many :answerers, through: :submitted_answers, source: :users

end
