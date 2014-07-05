FictiousApp.Views.PostsIndex = Backbone.View.extend({

  template: JST['posts/index'],

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
    $.ajax({
      type: "PUT",
      url: "/notifications/" + noteId,
      data: { new: false },
      success: function(data) {
        console.log(data)
      }
    });
    console.log($(event.currentTarget))
    debugger
  }
});
