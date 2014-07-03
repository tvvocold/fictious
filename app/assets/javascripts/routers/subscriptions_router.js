FictiousApp.Routers.Subscriptions = Backbone.Router.extend({
  initialize: function(options) {

  },

  routers: {
    'subscriptions': 'index',
    'subscriptions/:id': 'show',
    'subscriptions/new': 'new',
    'subscriptions/destroy': 'destroy'
  },

  show: function(id) {
    var currentUser = FictiousApp.users.get(id);
    var showView = new FictiousApp.Views.SubscriptionsShow({
      collection: currentUser.get('subscriptions')
    });

    this._swapView(indexView);
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('.view-container').html(view.render().$el);
  }

});
