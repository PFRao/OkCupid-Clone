class AddBirthdateToUsers < ActiveRecord::Migration
  def change
    add_column :users, :birthdate, :datetime, null: false
  end
end
