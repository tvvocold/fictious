class User < ActiveRecord::Base
  attr_accessor :password

  validates :username, :email, presence: true, uniqueness: true
  validate :password, length: { minimum: 6, allow_nil: true }
  has_attached_file :profile_picture, :styles => { :thumb => "64x64#", :regular => "300x300#" }, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :profile_picture, :content_type => /\Aimage\/.*\Z/

  has_many :posts, class_name: "Post", foreign_key: :author_id
  has_many :liked_posts, class_name: "Like", foreign_key: :user_id
  has_many :collections, class_name: "Collection", foreign_key: :owner_id

  has_many :subscribers, class_name: "Subscription", foreign_key: :subscriber_id
  has_many :subscriptions, through: :subscribers, source: :user
  has_many :subscription_posts, through: :subscriptions, source: :posts

  has_many :collection_subs, through: :subscribers, source: :collection
  has_many :collection_sub_posts, through: :collection_subs, source: :posts

  has_many :owned_groups, class_name: "Group", foreign_key: :mod_id
  has_many :group_users
  has_many :joined_groups, through: :group_users, source: :group
  has_many :group_requests, class_name: "GroupRequest", foreign_key: :user_id

  has_many :notifications

  has_many :comments

  after_initialize :ensure_session_token!

  def self.find_by_credentials(username, password)
    return if password.blank?
    user = User.find_by(username: username)
    if user && user.is_password?(password)
      return user
    end
    nil
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_session_token!
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end
end
