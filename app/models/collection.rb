class Collection < ActiveRecord::Base
  validates :owner_id, uniqueness: { scope: :title }
  validates :owner_id, :title, presence: true
  
  belongs_to :owner, class_name: "User", foreign_key: :owner_id
  has_many :collection_feeds, class_name: "CollectionFeed", foreign_key: :collection_id
  has_many :posts, through: :collection_feeds, source: :post
end
