class Api::PostsController < ApplicationController
  before_action :ensure_logged_in

  def index
    @posts = Post.all
    render :json => @posts
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
    @comment = current_user.comments.new()
    @comments = @post.comments
    render :json => @post
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy()
  end

  # def json_content
  #   @post = Post.find(params[:id])
  #   @content = @post.content
  #   render :json => @content
  # end

  def recent
    @posts = Post.all
  end

  def subscription_feed
    @user = current_user
    @posts = (@user.subscription_posts + @user.collection_sub_posts).uniq
    render :json => @posts
  end

  private

  def post_params
    params.require(:post).permit(:title, :subtitle, :content, :image)
  end
end
