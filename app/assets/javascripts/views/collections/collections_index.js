FictiousApp.Views.CollectionsIndex = Backbone.View.extend({

  template: JST['collections/index'],

  initialize: function() {

  },

  render: function() {
    var userId = FictiousApp.currentUser
    var myCollections = this.collection.where({ owner_id: userId });
    var followedCollections = FictiousApp.subscriptions.where({
      subscriber_id: userId,
      user_id: null
    });
    // var myCollections = FictiousApp.collections.fetch({
    //   traditional: true,
    //   data: { owner_id: FictiousApp.currentUser }
    // })
    var renderedView = this.template({
      collections: myCollections,
      followedCollections: followedCollections
    });

    this.$el.html(renderedView);
    return this;
  }

});
