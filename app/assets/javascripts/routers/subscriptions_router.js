FictiousApp.Routers.Subscriptions = Backbone.Router.extend({
  routers: {
    'subscriptions': 'index',
    'subscriptions/:id': 'show'
  },

  show: function(id) {
    var currentUser = FictiousApp.users.get(id);
    var subscriptions = currentUser.get('subscriptions');
    var showView = new FictiousApp.Views.SubscriptionsShow({
      collection: subscriptions
    });

    this._swapView(indexView);
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('.view-container').html(view.render().$el);
  }

});
