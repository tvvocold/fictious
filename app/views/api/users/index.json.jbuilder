  json.array! @users do |user|
    json.id user.id
    json.username user.username
    json.notifications user.notifications.where({ new: true })
    json.posts user.posts
    json.collections user.collections
    json.subscriptions user.subscriptions
    json.collection_subs user.collection_subs
    json.subscription_posts user.subscription_posts.uniq
    json.subscribers user.subscribers
    json.profile_picture_url_thumb asset_path(user.profile_picture.url(:thumb))
    json.profile_picture_url asset_path(user.profile_picture.url)
  end
