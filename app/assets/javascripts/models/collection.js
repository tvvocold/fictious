FictiousApp.Models.Collection = Backbone.Model.extend({
  urlRoot: "/api/collections",

  toJSON: function(){
    // We want proper namespacing of our attributes in Rails.
    var attributes = _.clone(this.attributes);
    return {collection: attributes};
  },
});
