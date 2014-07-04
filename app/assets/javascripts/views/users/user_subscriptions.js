FictiousApp.Views.UserSubscriptions = Backbone.View.extend({
  template: JST['users/subscriptions'],
  
  render: function() {
    var renderedContent = this.template({
      subscriptions: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  }
});
