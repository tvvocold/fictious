FictiousApp.Routers.Posts = Backbone.Router.extend({

  initialize: function(options) {
    this.posts = options.posts;
  },

  routes: {
    '': 'index',
    'posts/new': 'new',
    'posts/:post_id': 'show',
    'posts/:post_id/edit': 'edit',
    'feed': 'feed'
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
    FictiousApp.posts.fetch({
      success: function() {
        var post = FictiousApp.posts.get(id);
        var showView = new FictiousApp.Views.PostShow({
          model: post
        });

        that._swapView(showView);
      }
    });
  },

  edit: function(id) {
    var post = FictiousApp.posts.get(id);
    var editView = new FictiousApp.Views.PostEdit({
      model: post
    });

    this._swapView(editView);
  },

  new: function() {
    var newView = new FictiousApp.Views.PostNew();

    this._swapView(newView);
  },

  feed: function() {
    var that = this;
    var user = FictiousApp.users.get(FictiousApp.currentUser);

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
