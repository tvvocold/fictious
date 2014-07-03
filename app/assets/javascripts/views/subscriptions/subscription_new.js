FictiousApp.Views.SubscriptionNew = Backbone.View.extend({
  initialize: function(options) {
    this.collectionId = options.collectionId
  },

  render: function() {
    var renderedContent = this.template({
      collectionId: this.collectionId
    });

    this.$el.html(renderedContent);
    return this;
  }

});
