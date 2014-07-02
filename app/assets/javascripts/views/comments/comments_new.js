FictiousApp.Views.CommentsNew = Backbone.View.extend({
  template: JST["comments/new"],

  initialize: function(options) {
    this.currentUser = FictiousApp.users.get(FictiousApp.currentUser)
    this.pIndex = options.pIndex
    this.showCommentView = new FictiousApp.Views.CommentsShow({
      collection: this.collection,
      pIndex: this.pIndex
    });
    this.listenTo(this.collection, 'add', this.clear)
  },

  events: {
    'submit form': 'submit'
  },

  render: function() {
    var renderedContent = this.template({
      currentUser: this.currentUser,
      pIndex: this.pIndex,
      post: this.model,
      comments: this.collection
    });

    this.$el.html(renderedContent);
    this.$('#' + this.pIndex).html(this.showCommentView.render().$el);


    return this;
  },

  clear: function() {
    this.$('#comment-content').val('');
  },

  submit: function(event) {
    var that = this;
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var comment = new FictiousApp.Models.Comment(params["comment"]);
    comment.save({}, {
      success: function() {
        that.collection.add(comment);
      }
    });
  },

  remove: function() {
    this.showCommentView.remove();
    Backbone.View.prototype.remove.apply(this);
    return this;
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$('#' + this.pIndex).html(view.render().$el);
  }
});
