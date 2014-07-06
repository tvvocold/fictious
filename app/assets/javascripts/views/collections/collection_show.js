FictiousApp.Views.CollectionShow = Backbone.View.extend({
  initialize: function(options) {
    this.view = this;
    this.listenTo(FictiousApp.collectionFeeds, 'add', this.appendPost);
    this.listenTo(FictiousApp.subscriptions, 'add remove', this.render);
    this.listenTo(FictiousApp.collections, 'add change', this.render);
  },

  template: JST["collections/show"],

  events: {
    'submit .add-to-collection': 'addToCollection',
    'submit .follow-collection': 'subscribe',
    'submit .unfollow-collection': 'unsubscribe'
  },

  render: function() {
    var colFeeds = FictiousApp.collectionFeeds.where({ collection_id: this.model.id });
    var postIds = [];
    var posts = [];
    if (this.model.get('owner_id') === FictiousApp.currentUser) {
      var userPosts = FictiousApp.posts.where({ author_id: FictiousApp.currentUser });
    } else {
      var userPosts = [];
    }

    _(colFeeds).map(function(colFeed) { postIds.push(colFeed.get('post_id')) });
    _(postIds).map(function(postId) { posts.push(FictiousApp.posts.get(postId)) });

    var renderedContent = this.template({
      collection: this.model,
      posts: posts,
      userPosts: userPosts
    });

    this.$el.html(renderedContent);
    return this;
  },

  subscribe: function(event) {
    event.preventDefault();
    var $form = $('.follow-collection');
    var formData = $('.follow-collection').serialize();

    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: formData,
      success: function(data){
        console.log(data)
        FictiousApp.subscriptions.add(data);
        $('.follow-collection').attr('action', 'api/subscriptions/' + data.id);
        $('.follow-collection').addClass('unfollow-collection');
        $('.unfollow-collection').removeClass('follow-collection');
        $('.new-post-button').attr('value', 'Following Collection');
      }
    });
  },

  unsubscribe: function(event) {
    event.preventDefault();
    var $form = $('.unfollow-collection');
    var formData = $form.serialize();

    $.ajax({
      type: 'DELETE',
      url: $form.attr("action"),
      data: formData,
      success: function(data) {
        FictiousApp.subscriptions.remove(data);
        $('.unfollow-collection').attr('action', 'api/subscriptions');
        $('.unfollow-collection').addClass('follow-collection');
        $('.follow-collection').removeClass('unfollow-collection');
        $('.new-post-button').attr('value', 'Follow Collection');
      }
    });
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

  appendPost: function() {
    var colFeed = FictiousApp.collectionFeeds.last();
    var colPost = FictiousApp.posts.get(colFeed.get('post_id'));
    var user = FictiousApp.users.get(colPost.get('author_id'))
    var colId = colPost.id;
    var title = colPost.get('title');
    var subtitle = colPost.get('subtitle');
    var profilePic = user.get('profile_picture_url_thumb');
    var userName = user.get('username');

    $('.collection-posts').append('<li class="post-list collection-post-list"> \
    <a href="#/posts/' + colId + '"> \
    <h2>' + title + '</h2> \
    <h4>' + subtitle + '</h4> \
    <img src="' + profilePic + '"> <h5>' + userName + '</h5> \
    </a></li>')
  },

  addCollectionPost: function() {
    var colFeed = FictiousApp.collectionFeeds.last();
    var colPost = FictiousApp.posts.get(colFeed.get('post_id'));

    if (colFeed.get('collection_id') === this.model.get('id')) {
      $('.collection-posts').html('')
    }
  }
});
