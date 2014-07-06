FictiousApp.Views.PostsFeed = Backbone.View.extend({

  template: JST['posts/feed'],

  initialize: function() {
    FictiousApp.notifications.fetch();
    this.listenTo(FictiousApp.notifications, 'add change', this.getNotes)
  },

  events: {
    'click .notifications-button': 'revealNotifications',
    'click .note': 'markSeen'
  },

  render: function() {
    var renderedContent = this.template({
      posts: this.collection
    });

    this.$el.html(renderedContent);
    return this;
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
