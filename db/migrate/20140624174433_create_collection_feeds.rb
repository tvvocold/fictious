class CreateCollectionFeeds < ActiveRecord::Migration
  def change
    create_table :collection_feeds do |t|
      t.integer :post_id, null: false
      t.integer :collection_id, null: false

      t.timestamps
    end
    add_index :collection_feeds, [:post_id, :collection_id], unique: true
  end
end
