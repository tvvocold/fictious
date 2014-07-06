FictiousApp.Routers.Collections = Backbone.Router.extend({
  initialize: function(options) {
    // this.collections is NOT the same as this.collection
    this.collections = options.collections;
  },

  routes: {
    'collections': 'index',
    'collections/new': 'new',
    'collections/:id': 'show',
    'collections/:id/edit': 'edit'
  },

  index: function() {
    var indexView = new FictiousApp.Views.CollectionsIndex({
      collection: this.collections
    });
    this._swapView(indexView);
  },

  new: function() {
    var collection = new FictiousApp.Models.Collection();
    var newView = new FictiousApp.Views.CollectionNew({
      model: collection
    });

    this._swapView(newView);
  },

  show: function(id) {
    var that = this;
    FictiousApp.collections.fetch({
      success: function() {
        var collection = FictiousApp.collections.get(id);
        var showView = new FictiousApp.Views.CollectionShow({
          model: collection
        });
        that._swapView(showView);
      }
    });
  },

  edit: function(id) {
    var collection = FictiousApp.collections.get(id);
    var editView = new FictiousApp.Views.CollectionEdit({
      model: collection
    });

    this._swapView(editView);
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    $('.view-container').html(view.render().$el);
  }
});
