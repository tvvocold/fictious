FictiousApp.Views.PostNew = Backbone.View.extend({
  template: JST['posts/new'],

  events: {
    "submit form": "submit",
    "change #post-file-input": "fileSelect",
    "focus #content": "wrapBR",
    "focusout #content": "wrapPara",
    "mouseenter #publish": "setContent"
  },

  setContent: function() {
    var paragraphs = $('#content').find('p');
    _(paragraphs).each(function(paragraph) {
      if($(paragraph).html() !== "<br>") {
        $(paragraph).addClass('commentable');
        $(paragraph).attr("data-id", (Math.random()*0xFFFFFF<<0).toString(16));
      } else if ($(paragraph).html() === "<br>") {
        $(paragraph).removeClass('commentable');
      } else {
        console.log("WHAT?")
      }
    });
    var content = $('#content').html();
    $("#content-input").attr('value', content);
  },

  wrapBR: function() {
    if ($('#content').text() === "Write your story") {
      $('#content').html('<p><br></p>')
    }
  },

  wrapPara: function() {
    if ($('#content').text() === "") {
      $('#content').html('<p>Write your story</p>')
    }
  },

  // $('#publish').hover(function() {
  //   var paragraphs = $('#content').find('p');
  //   _(paragraphs).each(function(paragraph) {
  //     if($(paragraph).html() !== "<br>") {
  //       $(paragraph).addClass('commentable');
  //       $(paragraph).attr("data-id", (Math.random()*0xFFFFFF<<0).toString(16));
  //     } else if ($(paragraph).html() === "<br>") {
  //       $(paragraph).removeClass('commentable');
  //     } else {
  //       console.log("WHAT?")
  //     }
  //   });
  //   var content = $('#content').html();
  //   $("#content-input").attr('value', content);
  // });

  // $('#content').focus(function() {
  //   if ($('#content').text() === "Write your story") {
  //     $('#content').html('<p><br></p>')
  //   }
  // });

  // $('#content').focusout(function() {
  //   if ($('#content').text() === "") {
  //     $('#content').html('<p>Write your story</p>')
  //   }
  // });

  initialize: function(){
    this.model = new FictiousApp.Models.Post();
    this.collection = FictiousApp.posts;
  },

  render: function(){
    var html = this.template();

    this.$el.html(html);

    var editor = new MediumEditor($(this.el).find('.editable'));
    var contents = $(this.el).find('#content').contents();
    $(contents).wrap('<p></p>');
    
    return this;
  },

  submit: function(event){
    var that = this;
    var formData = $(event.currentTarget).serializeJSON();

    event.preventDefault();

    this.model.save(formData.post, {
      success: function(){
        FictiousApp.posts.add(that.model);
        // Remove the image attribute with raw data
        // from the model after uploading it.
        delete that.model.attributes.image;
        console.log(that.model);

        Backbone.history.navigate("posts/" + that.model.id, { trigger: true });
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
    this.$el.find('#new_post').css("color", "white");
    this.$el.find('#publish').css("border-color", "white");
    this.$el.find('p').css("color", "white");
  }


});
