FictiousApp.Views.CommentsNew = Backbone.View.extend({
  template: JST["comments/new"],

  initialize: function(options) {
    this.pIndex = options.pIndex
  },

  events: {
    'submit form': 'submit'
  },

  render: function() {
    var renderedContent = this.template({
      pIndex: this.pIndex,
      post: this.model,
      comments: this.collection
    });

    this.$el.html(renderedContent);

    // COMMMMENTS ARE DISAPPEARING!!!!!

    var showCommentView = new FictiousApp.Views.CommentsShow({
      collection: this.collection,
      posts: this.collection.where({ paragraph_index: this.pIndex })
    });

    this._swapView(showCommentView);

    return this;
  },

  submit: function(event) {
    var that = this;
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var comment = new FictiousApp.Models.Comment(params["comment"]);
    comment.save({}, {
      success: function() {
        that.collection.add(comment);
        that.render();
      }
    });
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$('#' + this.pIndex).html(view.render().$el);
  }
});
