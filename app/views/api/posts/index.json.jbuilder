json.array! @posts do |post|
  json.id post.id
  json.title post.title
  json.author_id post.author_id
  json.author post.author
  json.likes post.likes
  json.content post.content
  json.comments post.comments
  json.collectionFeeds = post.collection_feeds
  json.subtitle post.subtitle
  json.image_url post.image.url
end
