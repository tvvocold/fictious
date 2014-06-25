class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :content
      t.integer :user_id
      t.integer :content_id

      t.references :notifiable, polymorphic: true

      t.timestamps
    end
  end
end
