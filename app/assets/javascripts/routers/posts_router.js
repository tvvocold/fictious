FictiousApp.Routers.Posts = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.posts = options.posts;
  },

  routes: {
    '': 'index',
    'posts/new': 'new',
    'feed': 'feed',
    'posts/:post_id': 'show',
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
    $('.view-container').html(showView.render().$el);
  },

  new: function() {
    var newView = new FictiousApp.Views.PostNew();

    this._swapView(newView);
  },

  feed: function() {
    var that = this;
    var user = FictiousApp.users.get(FictiousApp.currentUser);
    debugger
    var posts = user.get('subscription_posts')
    var feedView = new FictiousApp.Views.PostsFeed({
      collection: posts
    });
    that._swapView(feedView);
  },


  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('.view-container').html(view.render().$el);
  }

});
