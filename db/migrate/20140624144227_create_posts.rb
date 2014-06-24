class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :author_id, null: false
      t.string :title, null: false
      t.string :subtitle, null: false
      t.text :content, null: false

      t.timestamps
    end
    add_index :posts, :author_id
  end
end
