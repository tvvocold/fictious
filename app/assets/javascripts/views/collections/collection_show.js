FictiousApp.Views.CollectionShow = Backbone.View.extend({
  initialize: function() {
    this.view = this;
  },

  template: JST["collections/show"],

  events: {
    'submit .follow-collection': 'subscribe',
    'submit .unfollow-collection': 'unsubscribe'
  },

  render: function() {
    var renderedContent = this.template({
      collection: this.model
    });

    this.$el.html(renderedContent);
    return this;
  },

  subscribe: function(event) {
    event.preventDefault();
    var view = this.view
    var $form = $('.follow-collection');
    var formData = $('.follow-collection').serialize();

    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: formData,
      success: function(data){
        debugger
        view.render();
      }
    });
  },

  unsubscribe: function(event) {
    event.preventDefault();
    var view = this.view
    var $form = $('.unfollow-collection');
    var formData = $form.serialize();

    $.ajax({
      type: 'DELETE',
      url: $form.attr("action"),
      data: formData,
      success: function(data) {
        debugger
        view.render();
      }
    });
  },

  swapButtons: function() {

  }
});
