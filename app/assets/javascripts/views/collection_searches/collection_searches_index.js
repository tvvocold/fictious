FictiousApp.Views.CollectionSearchesIndex = Backbone.View.extend({

  template: JST['collection_searches/index'],

  render: function() {
    var renderedContent = this.template({
      results: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  }

});
