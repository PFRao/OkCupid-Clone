class MakeGenderRequired < ActiveRecord::Migration
  def change
    change_column :users, :gender, :string, :null => false, :default => "man"
  end
end
