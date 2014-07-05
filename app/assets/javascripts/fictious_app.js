window.FictiousApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    FictiousApp.collections = new FictiousApp.Collections.Collections();
    FictiousApp.posts = new FictiousApp.Collections.Posts();
    FictiousApp.users = new FictiousApp.Collections.Users();

    FictiousApp.subscriptions = new FictiousApp.Collections.Subscriptions();
    FictiousApp.subscriptions.fetch();

    FictiousApp.collectionFeeds = new FictiousApp.Collections.CollectionFeeds();
    FictiousApp.collectionFeeds.fetch();

    FictiousApp.users.fetch({
      success: function() {
        new FictiousApp.Routers.Users({
          users: FictiousApp.users
        })
      }
    });

    FictiousApp.collections.fetch({
      success: function() {
        new FictiousApp.Routers.Collections({
          collections: FictiousApp.collections
        })
      }
    });

    var $rootEl = $('.home-page-content');

    FictiousApp.posts.fetch({
      success: function() {
        new FictiousApp.Routers.Posts({
          $rootEl: $rootEl,
          posts: FictiousApp.posts
        });
      }
    });

  }
};

$(document).ready(function(){
  FictiousApp.initialize();
  Backbone.history.start();
});
