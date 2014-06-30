FictiousApp.Routers.Comments = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.comments = options.comments;
  },

  routes: {
    '': 'index'
  }
});
