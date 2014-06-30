FictiousApp.Collections.Users = Backbone.Collection.extend({

  model: FictiousApp.Models.User,
  url: '/api/users'

});
