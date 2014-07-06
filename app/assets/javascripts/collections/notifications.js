FictiousApp.Collections.Notifications = Backbone.Collection.extend({

  model: FictiousApp.Models.Notification,
  url: 'api/notifications',
  comparator: function(model) {
    return -model.id
  }

});
