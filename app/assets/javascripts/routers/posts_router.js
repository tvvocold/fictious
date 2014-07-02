FictiousApp.Routers.Posts = Backbone.Router.extend({

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.posts = options.posts;
  },

  routes: {
    '': 'index',
    'subscriptions': 'feed',
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
    $('.view-container').html(showView.render().$el);
  },

  feed: function() {
    var that = this;
    var user = FictiousApp.users.fetch({id: FictiousApp.currentUser });
    var posts = new FictiousApp.Collections.Subscriptions();
    posts.fetch({
      success: function() {
        var feedView = new FictiousApp.Views.PostsFeed({
          collection: posts
        });
        that._swapView(feedView);
      }
    });
  },


  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('.view-container').html(view.render().$el);
  }

});
