class Api::CommentsController < ApplicationController
  def new
    @comment = current_user.comments.new()
    render :json => @comment
  end

  def index
    @comments = Comment.all
    render :json => @comments
  end

  def create
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      render :json => @comment
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
