class AddAttachmentCollectionPhotoToCollections < ActiveRecord::Migration
  def self.up
    change_table :collections do |t|
      t.attachment :collection_photo
    end
  end

  def self.down
    drop_attached_file :collections, :collection_photo
  end
end
