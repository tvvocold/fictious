FictiousApp.Views.CollectionEdit = Backbone.View.extend({
  template: JST['collections/edit'],

  initialize: function() {
    this.collection = FictiousApp.collections;
  },

  events: {
    'submit form': 'submit',
    "change #post-file-input": "fileSelect"
  },

  submit: function(event) {
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();

    event.preventDefault();

    this.model.save(formData.collection, {
      success: function() {
        that.collection.add(that.model);
        delete that.model.attributes.collection_photo;

        Backbone.history.navigate("collections/" + that.model.id, { trigger: true });
      }
    });
  },

  render: function() {
    var renderedContent = this.template({
      collection: this.model
    });

    this.$el.html(renderedContent);
    return this;
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
  }
});
