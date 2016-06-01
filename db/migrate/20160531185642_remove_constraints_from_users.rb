class RemoveConstraintsFromUsers < ActiveRecord::Migration
  def change
    change_column :users, :preferences, :string, :null => true
    change_column :users, :personality, :string, :null => true
    change_column :users, :looking_for, :string, :null => true
  end
end
