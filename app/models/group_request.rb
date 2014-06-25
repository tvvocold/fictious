class GroupRequest < ActiveRecord::Base
  belongs_to :group
  belongs_to :user
  has_many :notifications, as: :notifiable
end
