class CreateCollections < ActiveRecord::Migration
  def change
    create_table :collections do |t|
      t.integer :owner_id, null: false
      t.string :title, null: false

      t.timestamps
    end
    add_index :collections, [:owner_id, :title], unique: true
  end
end
