class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.integer :user_id, null: false
      t.integer :subscriber_id, null: false

      t.timestamps
    end
    add_index :subscriptions, [:subscriber_id, :user_id], unique: true
  end
end
