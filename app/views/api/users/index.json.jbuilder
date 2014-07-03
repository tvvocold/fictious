  json.array! @users do |user|
    json.id user.id
    json.username user.username
    json.notifications user.notifications
    json.posts user.posts
    json.collections user.collections
    json.subscribers user.subscribers
    json.profile_picture_url_thumb asset_path(user.profile_picture.url(:thumb))
    json.profile_picture_url asset_path(user.profile_picture.url)
  end
