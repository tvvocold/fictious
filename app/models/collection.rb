class Collection < ActiveRecord::Base
  validates :owner_id, uniqueness: { scope: :title }
  validates :owner_id, :title, presence: true

  # has_attached_file :image, :default_url => "/images/:style/missing.png"
  # validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  belongs_to :owner, class_name: "User", foreign_key: :owner_id
  has_many :collection_feeds, class_name: "CollectionFeed", foreign_key: :collection_id
  has_many :posts, through: :collection_feeds, source: :post
  has_many :subscribers, class_name: "Subscription", foreign_key: :subscriber_id
end
