class Notification < ActiveRecord::Base
  validates :user_id, uniqueness: { scope: [:notifiable_id, :notifiable_type] }
  belongs_to :notifiable, polymorphic: true
  belongs_to :user
end
