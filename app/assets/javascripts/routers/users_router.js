FictiousApp.Routers.Users = Backbone.Router.extend({

  routes: {
    'users': 'index',
    'users/:user_id': 'show'
  },

  index: function() {
    var indexView = new FictiousApp.Views.UsersIndex({
      collection: FictiousApp.users
    });

    this._swapView(indexView);
  },

  show: function(id) {
    var user = FictiousApp.users.get(id)
    var showView = new FictiousApp.Views.UsersShow({
      model: user
    });

    this._swapView(showView);
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('.view-container').html(view.render().$el);
  }
});
