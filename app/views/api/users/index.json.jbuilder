  json.array! @users do |user|
    json.id user.id
    json.username user.username
    json.profile_picture_url_thumb asset_path(user.profile_picture.url(:thumb))
    json.profile_picture_url asset_path(user.profile_picture.url)
  end
