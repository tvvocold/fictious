FictiousApp.Views.SubscriptionsShow = Backbone.View.extend({

  template: JST['subscriptions/show'],

  render: function() {
    var renderedContent = this.template({
      subscriptions: this.collection
    });
    debugger
    this.$el.html(renderedContent);
    return this;
  }

});
