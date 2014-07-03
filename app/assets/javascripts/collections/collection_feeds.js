FictiousApp.Collections.CollectionFeeds = Backbone.Collection.extend({

  model: FictiousApp.Models.CollectionFeed,
  url: '/api/collection_feeds.json'

});
