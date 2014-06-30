window.FictiousApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    FictiousApp.posts = new FictiousApp.Collections.Posts();
    FictiousApp.users = new FictiousApp.Collections.Users();
    FictiousApp.users.fetch();

    var $rootEl = $('.home-page-content');

    FictiousApp.posts.fetch({
      success: function() {
        new FictiousApp.Routers.Posts({
          $rootEl: $rootEl,
          posts: FictiousApp.posts
        });
        Backbone.history.start();
      },

      error: function() {
        alert("NO!");
      }
    });

  }
};

$(document).ready(function(){
  FictiousApp.initialize();
});
