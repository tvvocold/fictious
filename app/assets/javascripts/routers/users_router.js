FictiousApp.Routers.Users = Backbone.Router.extend({

  routes: {
    '': 'index'
  },

  index: function() {
    var indexView = new FictiousApp.Views.UsersIndex({
      collection: FictiousApp.users
    });

    this._swapView(indexView);
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
