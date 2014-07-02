json.array! @collections do |collection|
  json.id collection.id
  json.title collection.title
  json.owner_id collection.owner_id
  json.posts collection.posts
  json.collection_photo asset_path(collection.collection_photo.url)
  json.collection_photo_thumb asset_path(collection.collection_photo.url(:thumb))
  json.collection_photo_small asset_path(collection.collection_photo.url(:small))
end
