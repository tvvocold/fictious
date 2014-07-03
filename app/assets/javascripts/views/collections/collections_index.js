FictiousApp.Views.CollectionsIndex = Backbone.View.extend({

  template: JST['collections/index'],

  initialize: function() {
  },

  render: function() {
    var renderedView = this.template({
      collections: this.collection
    });

    this.$el.html(renderedView);
    return this;
  }

});
