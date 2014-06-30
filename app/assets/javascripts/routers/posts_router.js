FictiousApp.Routers.Posts = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.posts = options.posts;
  },

  routes: {
    '': 'index',
    'posts/subscription_feed': 'feed',
    'posts/:post_id': 'show'
  },

  index: function() {
    var that = this;
    var indexView = new FictiousApp.Views.PostsIndex({
      collection: that.posts
    });
    this._swapView(indexView);
  },

  show: function(id) {
    var that = this;
    var post = FictiousApp.posts.get(id)
    var showView = new FictiousApp.Views.PostShow({
      model: post
    });

    this.currentView && this.currentView.remove();
    this.currentView = showView;
    $('body').html(showView.render().$el);
  },

  feed: function() {
    var that = this;
    var user = FictiousApp.users.get(FictiousApp.currentUser);
    var posts = user.get('subscription_posts')
    var colPosts = user.get('collection_sub_posts')
    var feedView = new FictiousApp.Views.PostsFeed({
      collection: posts
    });
  },


  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }

});
