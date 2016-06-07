class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.text :self_summary
      t.text :do_with_life
      t.text :real_good_at
      t.text :first_thing
      t.text :favorites
      t.text :six_things
      t.text :think_about
      t.text :typical_friday
      t.text :message_if

      t.integer :user_id, null: false

      t.timestamps null: false
    end
    add_index :profiles, :user_id, unique: true
  end
end
