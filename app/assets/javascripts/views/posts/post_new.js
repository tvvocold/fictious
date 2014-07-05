FictiousApp.Views.PostNew = Backbone.View.extend({
  template: JST['posts/new'],

  events: {
    "submit form": "submit",
    "change #post-file-input": "fileSelect"
  },

  initialize: function(){
    this.model = new FictiousApp.Models.Post();
    this.collection = FictiousApp.posts;
  },

  render: function(){
    var html = this.template();

    this.$el.html(html);
    return this;
  },

  submit: function(event){
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();

    event.preventDefault();

    this.model.save(formData.post, {
      success: function(){
        that.collection.add(that.model);
        // Remove the image attribute with raw data
        // from the model after uploading it.
        delete that.model.attributes.image;
        console.log(that.model);

        Backbone.history.navigate("", { trigger: true });
      },

      error: function() {
      }
    })
  },

  fileSelect: function(event){
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
