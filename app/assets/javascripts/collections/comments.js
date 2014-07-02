FictiousApp.Collections.Comments = Backbone.Collection.extend({
  model: FictiousApp.Models.Comment,

  url: 'api/comments'

});
