FictiousApp.Collections.Comments = Backbone.Collection.extend({
  model: FictiousApp.Models.Comment,

  comparator: function(comment) {
    return -comment.get('id');
  },

  url: 'api/comments'

});
