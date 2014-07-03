json.array! @collection_feeds do |collection_feed|
  json.id collection_feed.id
  json.post_id collection_feed.post_id
  json.post collection_feed.post
  json.posts collection_feed.collection.posts
  json.collection_id collection_feed.collection_id
end
