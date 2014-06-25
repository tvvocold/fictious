class Group < ActiveRecord::Base
  belongs_to :mod, class_name: "User"
  has_many :group_users
  has_many :writers, through: :group_users, source: :user
  has_many :group_requests
  has_many :pending_writers, through: :group_requests, source: :user
end
