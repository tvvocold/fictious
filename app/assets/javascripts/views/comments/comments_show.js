FictiousApp.Views.CommentsShow = Backbone.View.extend({
  template: JST["comments/show"],

  initialize: function(options) {
    this.pIndex = options.pIndex;
    console.log("COL ", this.collection);
    this.listenTo(this.collection, "add", this.render);
  },

  render: function() {
    this.$('#comment-content').val('');
    var renderedContent = this.template({
      comments: this.collection.where({ paragraph_index: this.pIndex })
    });
    console.log("COL2 ", this.collection)
    this.$el.html(renderedContent);
    return this;
  }

});
