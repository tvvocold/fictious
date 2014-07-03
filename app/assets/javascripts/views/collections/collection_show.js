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

    // var collectionSubscribe = new FictiousApp.Views.SubscribeNew({
    //   collectionId:
    // });

    this.$el.html(renderedContent);
    return this;
  },

  subscribe: function(event) {
    event.preventDefault();
    var $form = $('.follow-collection');
    var formData = $('.follow-collection').serialize();

    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: formData,
      success: function(data){
        $('.follow-collection').attr('action', 'api/subscriptions/' + data.id);
        $('.follow-collection').addClass('unfollow-collection');
        $('.unfollow-collection').removeClass('follow-collection');
        $('.new-post-button').attr('value', 'Following Collection');
      }
    });
  },

  unsubscribe: function(event) {
    event.preventDefault();
    var $form = $('.unfollow-collection');
    var formData = $form.serialize();

    $.ajax({
      type: 'DELETE',
      url: $form.attr("action"),
      data: formData,
      success: function(data) {
        $('.unfollow-collection').attr('action', 'api/subscriptions');
        $('.unfollow-collection').addClass('follow-collection');
        $('.follow-collection').removeClass('unfollow-collection');
        $('.new-post-button').attr('value', 'Follow Collection');
      }
    });
  }
});
