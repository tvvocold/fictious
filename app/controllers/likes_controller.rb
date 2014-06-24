class LikesController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @like = Like.new(user_id: current_user.id, post_id: @post.id)
    if @like.save
      redirect_to @post
    else
      redirect_to @post
    end
  end

  def destroy
    @post = Post.find(params[:post_id])
    @like.find_by(user_id: current_user.id, post_id: @post.id)
    @like.destroy()
    redirect_to @post
  end
end
