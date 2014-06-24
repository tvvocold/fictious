class Post < ActiveRecord::Base
  validates :title, :subtitle, :author, :content, presence: true

  belongs_to :author, class_name: "User", foreign_key: :author_id
  has_many :likes
  has_many :collection_feeds
  has_many :collections, through: :collection_feeds, source: :collection
end
