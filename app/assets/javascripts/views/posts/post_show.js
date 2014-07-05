FictiousApp.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],

  initialize: function() {
    this.comments = this.model.comments();
    this.liked = 1;
  },

  events: {
    'click .comment-caller': 'renderNewComment',
    'submit .add-to-collection': 'addToCollection',
    'click .like-post': 'likePost',
    'click .unlike-post': 'unlikePost'
  },

  render: function() {
    var post = this.model;
    var userCollections = FictiousApp.users.get(FictiousApp.currentUser).get('collections')
    var renderedContent = this.template({
      post: this.model,
      collections: userCollections
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
        "left": 105 + "%",
        "top": y + "%"
      });

    }
    return this;
  },

  addToCollection: function(event) {
    event.preventDefault();

    var $form = $('.add-to-collection');
    var formData = $(event.currentTarget).serialize();
    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: formData,
      success: function(data) {
        console.log(data)
        FictiousApp.collectionFeeds.add(new FictiousApp.Models.CollectionFeed(data));
        
      },
    });
  },

  likePost: function(event) {
    event.preventDefault();
    var $form = $('.like-post');
    var formData = $form.serialize();
    var post = this.model;
    var num = this.liked
    this.liked = 1;
    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: formData,
      success: function(data) {
        console.log('liked')
        $('.like-post').attr('action', '/likes/' + data.id);
        $('.like-post').find('input').val(post.get('likes').length + num + " | ♥ Recommend");
        $('.like-post').addClass('unlike-post');
        $('.unlike-post').removeClass('like-post');
      }
    })
  },

  unlikePost: function(event) {
    event.preventDefault();
    var $form = $('.unlike-post');
    var formData = $form.serialize();
    var post = this.model;
    var num = this.liked;
    this.liked = 0;
    $.ajax({
      type: "DELETE",
      url: $form.attr("action"),
      data: formData,
      success: function(data) {
        console.log('unliked')
        $('.unlike-post').attr('action', '/posts/' + post.id + '/likes');
        $('.unlike-post').find('input').val(post.get('likes').length - num + " | ♥ Recommend");
        $('.unlike-post').addClass('like-post');
        $('.like-post').removeClass('unlike-post');
      },
      error: function(data) {
        console.log('error', data)
      }
    })
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$('#post-show-content').append(view.render().$el);
  }


});
