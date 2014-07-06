FictiousApp.Views.CollectionsIndex = Backbone.View.extend({

  template: JST['collections/index'],

  initialize: function() {
    console.log("initialize")
    this.results = new FictiousApp.Collections.CollectionSearches();
  },

  events: {
    'focusin .text-input': 'search'
  },

  render: function() {
    FictiousApp.collections.fetch();
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
  },

  search: function() {
    console.log('searching')
    var that = this;
    $('.text-input').keypress(function (e) {
      if (e.which == 13) {
        var query = $('.text-input').val();

        $.ajax({
          type: "POST",
          url: "api/collections/search",
          data: { collection: { query: query } },
          success: function(data) {
            that.results.reset(data);
            that.appendSearchResults();
          },

          error: function(data) {
            debugger
          }
        });
        return false;
      }
    });
  },

  appendSearchResults: function() {
    console.log('made it to append');
    var results = this.results;
    var searchView = new FictiousApp.Views.CollectionSearchesIndex({
      collection: results
    });

    this._swapView(searchView);
  },

  _swapView: function(view) {
    this.currentView && this.currentView.remove();
    this.currentView = this.view;
    this.$('.collections-container').html(view.render().$el)
  }

});
