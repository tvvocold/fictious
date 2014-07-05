class LikesController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @user = User.find(@post.author_id)
    @like = Like.new(user_id: current_user.id, post_id: @post.id)
    if @like.save
      message = current_user.username + " liked your post: " + @post.title
      if !Notification.find_by(user_id: @user.id, content: message)
        @like.notifications.create(content: message, user_id: @user.id, url: "/#/posts/" + @post.id.to_s, new: true)
      end
      render :json => @like
    else
      redirect_to @post
    end
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy()
    head :ok
  end
end
