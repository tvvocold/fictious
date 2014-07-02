FictiousApp.Routers.Collections = Backbone.Router.extend({
  initialize: function(options) {
    // this.collections is NOT the same as this.collection
    this.collections = options.collections
  },

  routes: {
    'collections': 'index',
    'collections/:id': 'show'
  },

  index: function() {
    var indexView = new FictiousApp.Views.CollectionsIndex({
      collection: this.collections
    });
    this._swapView(indexView);
  },

  show: function(id) {
    var collection = this.collections.get(id);
    var showView = new FictiousApp.Views.CollectionShow({
      model: collection
    });

    this._swapView(showView);
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('.view-container').html(view.render().$el);
  }
});
