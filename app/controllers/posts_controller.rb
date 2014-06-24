class PostsController < ApplicationController
  def index
    @posts = current_user.posts
  end

  def new
    @post = Post.new()
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      redirect_to :root
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      redirect_to :root
    else
      flash.now[:errors] = @post.errors.full_messages
      render :edit
    end
  end

  def show
    @post = Post.find(params[:id])
    @author = User.find(@post.author_id)
    @collections = current_user.collections
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy()
  end

  def recent
    @posts = Post.all
  end

  private

  def post_params
    params.require(:post).permit(:title, :subtitle, :content)
  end
end
