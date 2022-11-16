class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :user_id, null: false
      t.timestamps
    end

    add_index :questions, :title
  end
end
