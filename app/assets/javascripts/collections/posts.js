FictiousApp.Collections.Posts = Backbone.Collection.extend({

  model: FictiousApp.Models.Post,
  url: '/api/posts.json'

});
