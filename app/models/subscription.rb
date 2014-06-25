class Subscription < ActiveRecord::Base
  validates :user_id, :subscriber_id, presence: true
  validates :user_id, uniqueness: { scope: :subscriber_id }

  belongs_to :user
  belongs_to :subscriber, class_name: "User", foreign_key: :subscriber_id
  has_many :posts, through: :user, source: :posts
end
