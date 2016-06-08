class CreateConversations < ActiveRecord::Migration
  def change
    create_table :conversations do |t|
      t.integer :user_id, null: false
      t.integer :user2_id, null: false

      t.timestamps null: false
    end
    add_column :messages, :convo_id, :integer, null: false
    add_index :messages, :convo_id
    add_index :conversations, :user_id
    add_index :conversations, :user2_id
  end
end
