FictiousApp.Models.Post = Backbone.Model.extend({
  urlRoot: "/api/posts",
  
  toJSON: function(){
    // We want proper namespacing of our attributes in Rails.
    var attributes = _.clone(this.attributes);
    return {post: attributes};
  },

  parse: function (jsonResp) {
    if (jsonResp.comments) {
      this.comments().set(jsonResp.comments);
      delete jsonResp.comments;
    }
    return jsonResp;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new FictiousApp.Collections.Comments([], {
        post: this
      });
    }
    return this._comments;
  }
});
