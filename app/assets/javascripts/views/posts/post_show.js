FictiousApp.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],

  initialize: function() {
    this.comments = this.model.comments();
    this.currentUser = FictiousApp.users.get(FictiousApp.currentUser);
    this.liked = false;
    this.unliked = false;
    this.listenTo(FictiousApp.collections, 'add', this.fetchCollections);
  },

  events: {
    'click .comment-caller': 'renderNewComment',
    'submit .add-to-collection': 'addToCollection',
    'click .like-post': 'likePost',
    'click .unlike-post': 'unlikePost',
    'mouseenter .commentable-paragraph': 'revealCaller',
    'mouseleave .commentable-paragraph': 'hideCaller',
    'click #find-posts-for-collection': 'revealCollections'
  },

  revealCollections: function(event) {
    $(".collection-list").toggleClass("hidden");
    $("#find-posts-for-collection").toggleClass("hidden");
  },

  revealCaller: function(event) {
    $($(event.currentTarget).find('div')).removeClass('hidden');
  },

  hideCaller: function(event) {
    $($(event.currentTarget).find('div')).addClass('hidden');
  },

  fetchCollections: function() {
    FictiousApp.collections.fetch({
      success: function() {
        this.render();
      }
    });
  },

  render: function() {
    var post = this.model;
    var userCollections = FictiousApp.collections.where({ owner_id: FictiousApp.currentUser });
    this.comments.fetch();
    var renderedContent = this.template({
      post: this.model,
      collections: userCollections
    });

    this.$el.html(renderedContent);
    var paras = $(this.el).find('p');
    $.each(paras, function(i, val) {
      if($(val).hasClass('commentable')) {
        $(val).wrap('<div class="commentable-paragraph"></div>');
        $(val).parent().append('<div class="comment-caller hidden"></div>')
      }
    });

    debugger

    return this;
  },

  renderNewComment: function(event) {
    console.log(event);
    $('.view-post-content').toggleClass('moved');
    // var commentClass = $(event.target).prev().attr('data-id')
    // // $('#comments').empty();
    comments = this.comments;
    var paragraphIndex = $(event.toElement.previousSibling).attr('data-id');
    console.log(paragraphIndex);
    if($('.moved').length === 0) {
      $('.new-comment-form').toggleClass('hidden-comment');
      $('#comments').empty();
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
    $(event.currentTarget).addClass('checked')
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
    var that = this;
    event.preventDefault();
    var $form = $('.like-post');
    var formData = $form.serialize();
    var post = this.model;
    var notification = new FictiousApp.Models.Notification({
      user_id: post.get('author_id'),
      content: this.currentUser.get('username') + " liked your post: " + post.get('title'),
      post_id: post.id
    });
    if (this.unliked) {
      var num = 0;
      this.unliked = false;
    } else {
      var num = 1;
      this.liked = true;
    }

    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: formData,
      success: function(data) {
        console.log('liked', that.liked, that.unliked)
        notification.save()
        FictiousApp.notifications.add(notification);
        // FictiousApp.notifications.add(notification);
        $('.like-post').attr('action', '/likes/' + data.id);
        $('.like-post').find('input').val(post.get('likes').length + num + " | ♥ Recommend");
        $('.like-post').addClass('unlike-post');
        $('.unlike-post').removeClass('like-post');
      }
    })
  },

  unlikePost: function(event) {
    var that = this;
    event.preventDefault();
    var $form = $('.unlike-post');
    var formData = $form.serialize();
    var post = this.model;
    if (this.liked) {
      var num = 0;
      this.liked;
    } else {
      var num = 1;
      this.unliked = true;
    }

    $.ajax({
      type: "DELETE",
      url: $form.attr("action"),
      data: formData,
      success: function(data) {
        console.log('unliked', that.unliked, that.liked)
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
    $('#post-show-content').append(view.render().$el);
  }


});
