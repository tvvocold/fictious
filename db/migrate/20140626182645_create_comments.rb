class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.integer :post_id, null: false
      t.text :content, null: false
      t.string :paragraph_index, null: false

      t.timestamps
    end
    add_index :comments, :post_id
    add_index :comments, :user_id
  end
end