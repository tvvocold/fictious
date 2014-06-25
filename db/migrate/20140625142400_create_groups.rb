class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.integer :mod_id, null: false
      t.string :name, null: false

      t.timestamps
    end
    add_index :groups, :mod_id
  end
end
