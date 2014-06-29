class CommentsController < ApplicationController
  def new
    @comment = current_user.comments.new()
  end

  def index
    @post = Post.find(params[:post_id])
    @comments = @post.comments
    render :json => @comments
  end

  def create
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      redirect_to :back
    else
      flash.now[:errors] = @comment.errors.full_messages
      redirect_to :back
    end
  end

  def show
    @comment = Comment.find(params[:id])
    @user = @comment.user
    render :json => @user
  end

  private

  def comment_params
    params.require(:comment).permit(:post_id, :paragraph_index, :content)
  end
end
