window.FictiousApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    FictiousApp.collections = new FictiousApp.Collections.Collections();
    FictiousApp.posts = new FictiousApp.Collections.Posts();
    FictiousApp.users = new FictiousApp.Collections.Users();
    FictiousApp.users.fetch();
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
        Backbone.history.start();
      }
    });

  }
};

$(document).ready(function(){
  FictiousApp.initialize();
});
