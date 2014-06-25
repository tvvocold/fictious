class UsersController < ApplicationController
  def new
    @user = User.new()
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      log_in(@user)
      redirect_to :root
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
    @posts = @user.posts
    @collections = @user.collections
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
