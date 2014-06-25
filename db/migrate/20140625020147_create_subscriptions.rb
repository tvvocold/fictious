class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :user_id
      t.integer :subscriber_id, null: false
      t.integer :collection_id

      t.timestamps
    end
    add_index :subscriptions, [:subscriber_id, :user_id], unique: true
    add_index :subscriptions, [:subscriber_id, :collection_id], unique: true
  end
end
