FictiousApp.Views.CollectionShow = Backbone.View.extend({
  template: JST["collections/show"],

  render: function() {
    var renderedContent = this.template({
      collection: this.model
    });

    this.$el.html(renderedContent);
    return this;
  }
});
