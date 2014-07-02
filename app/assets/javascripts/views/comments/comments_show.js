FictiousApp.Views.CommentsShow = Backbone.View.extend({
  template: JST["comments/show"],

  initialize: function(options) {
    this.posts = options.posts;
    this.listenTo(this.collection, "add", this.render);
  },

  render: function() {
    var renderedContent = this.template({
      comments: this.posts
    });
    this.$el.html(renderedContent);
    return this;
  }

});
