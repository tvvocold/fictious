class UsersController < ApplicationController
  def new
    @user = User.new()
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      @user.profile_picture_url = @user.profile_picture.url
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
    @subscription = Subscription.find_by(user_id: params[:id],
                                         subscriber_id: current_user.id
                                         )
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :profile_picture)
  end
end
