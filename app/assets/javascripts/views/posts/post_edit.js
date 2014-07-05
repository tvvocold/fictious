FictiousApp.Views.PostEdit = Backbone.View.extend({
  template: JST['posts/edit'],

  initialize: function() {
    this.collection = FictiousApp.posts
  },

  events: {
    'submit form': 'submit',
    "change #post-file-input": "fileSelect"
  },

  submit: function(event) {
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();

    event.preventDefault();

    this.model.save(formData.post, {
      success: function() {
        that.collection.add(that.model);
        delete that.model.attributes.image;

        Backbone.history.navigate("posts/" + that.model.id, { trigger: true });
      }
    });
  },

  render: function() {
    var postContent = this.model.get('content');
    var renderedContent = this.template({
      post: this.model,
      postContent: postContent
    });

    this.$el.html(renderedContent);
    return this;
  },

  fileSelect: function(event){
    alert("FILE!")
    var that = this;
    var imageFile = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that.model.set("image", this.result);
      that._updatePreview(this.result);
    }

    if(imageFile){
      reader.readAsDataURL(imageFile);
    } else {
      this._updatePreview("");
    }
  },

  _updatePreview: function(imageData){
    this.$el.find('.post-image-preview').toggleClass('image-container-post');
    this.$el.find('.image-container-home').toggleClass('.post-image-preview');
    this.$el.find("#post-image-preview").attr("src", imageData);
  }
});
