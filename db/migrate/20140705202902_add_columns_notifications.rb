class AddColumnsNotifications < ActiveRecord::Migration
  def change
    change_table :notifications do |t|
      t.boolean :new, null:false
      t.string :url

    end
    add_index :notifications, :content
    add_index :notifications, [:user_id, :content], unique: true
  end
end
