class AddUnreadToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :unread, :boolean, default: true
  end
end
