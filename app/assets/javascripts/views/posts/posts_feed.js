FictiousApp.Views.PostsFeed = Backbone.View.extend({

  template: JST['posts/feed'],

  render: function() {
    var renderedContent = this.template({
      posts: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  }
});
