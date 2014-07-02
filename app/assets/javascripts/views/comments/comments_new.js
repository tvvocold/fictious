FictiousApp.Views.CommentsNew = Backbone.View.extend({
  template: JST["comments/new"],

  initialize: function(options) {
    this.pIndex = options.pIndex
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
      collection: this.collection.where({ paragraph_index: this.pIndex })
    });

    this._swapView(showCommentView);

    return this;
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$('#' + this.pIndex).html(view.render().$el);
  }
});
