class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :description, null: false
      t.string :answers, null: false
      t.string :categories, null: false
      t.string :weights, null: false
      t.boolean :multiple, null: false, default: false

      t.timestamps null: false
    end
  end
end
