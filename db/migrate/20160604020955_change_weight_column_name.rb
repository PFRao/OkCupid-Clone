class ChangeWeightColumnName < ActiveRecord::Migration
  def change
    remove_column :answer_choices, :weight, :integer
    add_column :answer_choices, :value, :integer
  end
end
