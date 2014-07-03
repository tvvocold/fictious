FictiousApp.Views.UsersShow = Backbone.View.extend({
  template: JST['users/show'],

  events: {
    'submit .follow-user': 'subscribe',
    'submit .unfollow-user': 'unsubscribe'
  },

  render: function() {
    var userPosts = this.model.get('posts');
    var userCollections = this.model.get('collections');

    var renderedContent = this.template({
      user: this.model,
      posts: userPosts,
      collections: userCollections
    });

    this.$el.html(renderedContent);
    return this;
  },

  subscribe: function(event) {
    event.preventDefault();
    var $form = $('.follow-user');
    var formData = $('.follow-user').serialize();

    $.ajax({
      type: "POST",
      url: $form.attr("action"),
      data: formData,
      success: function(data){
        $('.follow-user').attr('action', 'api/subscriptions/' + data.id);
        $('.follow-user').addClass('unfollow-user');
        $('.unfollow-user').removeClass('follow-user');
        $('.button-centered').attr('value', 'Following User');
      }
    });
  },

  unsubscribe: function(event) {
    event.preventDefault();
    var $form = $('.unfollow-user');
    var formData = $form.serialize();

    $.ajax({
      type: 'DELETE',
      url: $form.attr("action"),
      data: formData,
      success: function(data) {
        $('.unfollow-user').attr('action', 'api/subscriptions');
        $('.unfollow-user').addClass('follow-user');
        $('.follow-user').removeClass('unfollow-user');
        $('.button-centered').attr('value', 'Follow User');
      }
    });
  }
});
