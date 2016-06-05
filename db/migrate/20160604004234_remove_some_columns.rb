class RemoveSomeColumns < ActiveRecord::Migration
  def change
    remove_column :questions, :answers, :string
    remove_column :questions, :weights, :string
    remove_column :questions, :categories, :string

    remove_column :users, :looking_for, :string
    remove_column :users, :preferences, :string

    remove_column :answers, :question_id, :integer
    remove_column :answers, :preferred, :string
    remove_column :answers, :answer, :integer
    add_column :answers, :acceptable_choices, :string
    add_column :answers, :answer_choice_id, :integer
  end
end
