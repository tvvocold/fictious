class Post < ActiveRecord::Base
  validates :title, :subtitle, :author, :content, presence: true
  has_attached_file :image, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  belongs_to :author, class_name: "User", foreign_key: :author_id
  has_many :likes
  has_many :collection_feeds
  has_many :collections, through: :collection_feeds, source: :collection

  has_many :comments

end
