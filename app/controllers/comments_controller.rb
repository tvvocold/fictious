class CommentsController < ApplicationController
  def new

  end

  def index

  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      redirect_to :back
    else
      fail
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:user_id, :post_id, :paragraph_index, :content)
  end
end
