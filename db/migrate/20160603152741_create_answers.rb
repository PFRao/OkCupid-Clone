class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :user_id, null: false
      t.integer :question_id, null: false
      t.integer :answer
      t.string :preferred
      t.integer :weight, null: false
      t.boolean :public, null: false, default: true

      t.timestamps null: false
    end
    add_index :answers, :user_id
    add_index :answers, :question_id
  end
end
