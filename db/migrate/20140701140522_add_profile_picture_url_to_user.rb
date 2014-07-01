class AddProfilePictureUrlToUser < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.string :profile_picture_url
    end
  end
end
