FictiousApp.Views.CollectionShow = Backbone.View.extend({
  initialize: function(options) {
    this.view = this;
    this.listenTo(FictiousApp.collectionFeeds, 'add', this.render);
    this.listenTo(FictiousApp.subscriptions, 'add remove', this.render);
  },

  template: JST["collections/show"],

  events: {
    'submit .follow-collection': 'subscribe',
    'submit .unfollow-collection': 'unsubscribe'
  },

  render: function() {
    var colFeeds = FictiousApp.collectionFeeds.where({ collection_id: this.model.id });
    var postIds = [];
    var posts = [];

    _(colFeeds).map(function(colFeed) { postIds.push(colFeed.get('post_id')) });
    _(postIds).map(function(postId) { posts.push(FictiousApp.posts.get(postId)) });
    debugger

    var renderedContent = this.template({
      collection: this.model,
      posts: posts
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

  addCollectionPost: function() {
    var colFeed = FictiousApp.collectionFeeds.last();
    var colPost = FictiousApp.posts.get(colFeed.get('post_id'));

    if (colFeed.get('collection_id') === this.model.get('id')) {
      $('.collection-posts').html('')
    }
  }
});
