FictiousApp.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],

  initialize: function() {
    this.comments = this.model.comments();
  },

  events: {
    'click .comment-caller': 'renderNewComment'
  },

  render: function() {
    var post = this.model;
    var renderedContent = this.template({
      post: this.model
    });

    this.$el.html(renderedContent);

    return this;
  },

  renderNewComment: function(event) {
    console.log(event);
    comments = this.comments;
    var paragraphIndex = $(event.toElement.previousSibling).attr('data-id');
    console.log(paragraphIndex);
    if($('.moved').length === 0) {
      $('.new-comment-form').toggleClass('hidden-comment');
    } else {

      var newCommentView = new FictiousApp.Views.CommentsNew({
        pIndex: paragraphIndex,
        model: this.model,
        collection: this.comments
      });

      var y = ((event.pageY - $('#post-show-content').offset().top) / $('#post-show-content').outerHeight()) * 100;
      console.log('y: ', y);

      this._swapView(newCommentView);

      $('.new-comment-form').css({
        "left": 100 + "%",
        "top": y + "%"
      });

    }
    return this;
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$('#post-show-content').append(view.render().$el);
  }


});
