class CommentsController < ApplicationController
  def new

  end

  def index
    @comments = current_user.comments
    render :json => @comments
  end

  def create
    @comment = Comment.new(comment_params)
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
    params.require(:comment).permit(:user_id, :post_id, :paragraph_index, :content)
  end
end
