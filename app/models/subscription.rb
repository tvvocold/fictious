class Subscription < ActiveRecord::Base
  validates :subscriber_id, presence: true
  validates :user_id, uniqueness: { scope: :subscriber_id }
  validates :collection_id, uniqueness: { scope: :subscriber_id }

  belongs_to :user
  belongs_to :subscriber, class_name: "User", foreign_key: :subscriber_id
  has_many :posts, through: :user, source: :posts

  belongs_to :collection
  has_many :collection_posts, through: :collection, source: :posts
end
