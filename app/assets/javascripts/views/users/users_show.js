FictiousApp.Views.UsersShow = Backbone.View.extend({
  template: JST['users/show'],

  initialize: function() {
    this.listenTo(FictiousApp.subscriptions, 'add remove', this.render)
  },

  events: {
    'submit .follow-user': 'subscribe',
    'submit .unfollow-user': 'unsubscribe'
  },

  render: function() {
    var userPosts = FictiousApp.posts.where({ author_id: this.model.id });
    var userCollections = FictiousApp.collections.where({ owner_id: this.model.id });
    var currentUser = FictiousApp.users.get(FictiousApp.currentUser);
    var currentSubscriptions = FictiousApp.subscriptions.where({ subscriber_id: FictiousApp.currentUser });
    var subNames = [];
    _(currentSubscriptions).each(function(sub) {
      subNames.push(sub.get('user_id'));
    });

    FictiousApp.collections.fetch();

    var renderedContent = this.template({
      user: this.model,
      posts: _(userPosts).first(5),
      collections: userCollections,
      subNames: subNames
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
        FictiousApp.subscriptions.add(data);
        // $('.follow-user').attr('action', 'api/subscriptions/' + data.id);
        // $('.follow-user').addClass('unfollow-user');
        // $('.unfollow-user').removeClass('follow-user');
        // $('.button-centered').attr('value', 'Following User');
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
        FictiousApp.subscriptions.remove(data);
        // $('.unfollow-user').attr('action', 'api/subscriptions');
        // $('.unfollow-user').addClass('follow-user');
        // $('.follow-user').removeClass('unfollow-user');
        // $('.button-centered').attr('value', 'Follow User');
      }
    });
  }
});
