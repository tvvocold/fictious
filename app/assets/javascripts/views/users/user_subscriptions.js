FictiousApp.Views.UserSubscriptions = Backbone.View.extend({
  template: JST['users/subscriptions'],

  initialize: function() {
    // this.listenTo(FictiousApp.subscriptions, 'add remove', this.render)
  },

  render: function() {
    var subscriptions = FictiousApp.subscriptions.where({ subscriber_id: FictiousApp.currentUser, collection_id: null });
    var renderedContent = this.template({
      subscriptions: subscriptions
    });

    this.$el.html(renderedContent);
    return this;
  }
});
