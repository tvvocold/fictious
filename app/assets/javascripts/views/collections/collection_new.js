FictiousApp.Views.CollectionNew = Backbone.View.extend({
  template: JST['collections/new'],

  events: {
    "submit form": "submit",
    "change #post-file-input": "fileSelect"
  },

  initialize: function() {
    this.collection = FictiousApp.collections;
  },

  render: function() {
    var renderedContent = this.template();

    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event){
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();

    event.preventDefault();

    this.model.save(formData.collection, {
      success: function(){
        FictiousApp.collections.add(that.model);
        delete that.model.attributes.collection_photo;
        console.log(that.model);

        Backbone.history.navigate("collections/" + that.model.id, { trigger: true });
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
      that.model.set("collection_photo", this.result);
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
    this.$el.find('#new_post').css("color", "white");
    this.$el.find('#publish').css("border-color", "white");
    this.$el.find('p').css("color", "white");
  }
});
