FictiousApp.Views.PostsFeed = Backbone.View.extend({

  template: JST['posts/feed'],

  initialize: function() {
    this.listenTo(FictiousApp.notifications, 'add change', this.getNotes);
    this.listenTo(FictiousApp.subscriptionPosts, 'add change remove', this.render)
  },

  events: {
    'click .notifications-button': 'revealNotifications',
    'click .note': 'markSeen'
  },

  render: function() {
    // FictiousApp.notifications.fetch();
    FictiousApp.subscriptionPosts.fetch();
    var that = this;
    var user = FictiousApp.users.get(FictiousApp.currentUser);
    // var posts = user.get('subscription_posts')
    var subPosts = FictiousApp.subscriptionPosts
    var notifications = FictiousApp.notifications.where({ new: true });
    var renderedContent = that.template({
      posts: subPosts,
      notifications: notifications
    });

    that.$el.html(renderedContent);
    return that;

  },

  revealNotifications: function() {
    $('.notifications').toggleClass('hidden');
  },

  markSeen: function(event) {
    var noteId = $(event.currentTarget).attr('data-id');

    var notification = FictiousApp.notifications.get(noteId);
    var url = notification.get('url');
    notification.save({ new: false }, {
      success: function() {

      }
    });
    // $.ajax({
    //   type: "PUT",
    //   url: "api/notifications/" + noteId,
    //   data: notification,
    //   success: function(data) {
    //     console.log(data)
    //   },
    //   error: function(data) {
    //     debugger
    //   }
    // });
  },

  getNotes: function() {
    var that = this;
    FictiousApp.notifications.fetch({
      success: function() {
        that.render();
      }
    });
  }
});
