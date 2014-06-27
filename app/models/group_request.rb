class GroupRequest < ActiveRecord::Base
  validates :user_id, uniqueness: {scope: :group_id}
  belongs_to :group
  belongs_to :user
  has_many :notifications, as: :notifiable
end
