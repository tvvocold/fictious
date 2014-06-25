class CreateGroupRequests < ActiveRecord::Migration
  def change
    create_table :group_requests do |t|
      t.integer :group_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :group_requests, [:group_id, :user_id], unique: true
  end
end
