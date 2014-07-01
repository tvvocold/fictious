FictiousApp.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],

  render: function() {
    var post = this.model;
    // var author = FictiousApp.users.get(post.get('author_id'));
    // author.fetch();
    var renderedContent = this.template({
      post: this.model
      // author: author
    });

    this.$el.html(renderedContent);
    return this;
  }
});
