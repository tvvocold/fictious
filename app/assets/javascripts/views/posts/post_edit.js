FictiousApp.Views.PostEdit = Backbone.View.extend({
  template: JST['posts/edit'],

  render: function() {
    var postContent = this.model.get('content');
    var renderedContent = this.template({
      post: this.model,
      postContent: postContent
    });

    this.$el.html(renderedContent);
    return this;
  }
});
