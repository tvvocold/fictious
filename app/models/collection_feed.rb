class CollectionFeed < ActiveRecord::Base
  validates :post_id, uniqueness: { scope: :collection_id }
  validates :post_id, :collection_id, presence: true
  
  belongs_to :post, class_name: "Post", foreign_key: :post_id
  belongs_to :collection, class_name: "Collection", foreign_key: :collection_id
end
