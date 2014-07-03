FictiousApp.Views.UsersShow = Backbone.View.extend({
  template: JST['users/show'],

  render: function() {
    var userPosts = this.model.get('posts');
    var userCollections = this.model.get('collections');

    var renderedContent = this.template({
      user: this.model,
      posts: userPosts,
      collections: userCollections
    });

    this.$el.html(renderedContent);
    return this;
  }
});
