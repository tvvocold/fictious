FictiousApp.Routers.Subscriptions = Backbone.Router.extend({
  initialize: function(options) {

  },

  routers: {
    'subscriptions': 'index',
    'subscriptions/new': 'new',
    'subscriptions/destroy': 'destroy'
  },

  new: function() {
    var newSubscriptionView = new FictiousApp.Views.SubscriptionNew({

    });
  }

});
