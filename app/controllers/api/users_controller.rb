class Api::UsersController < ApplicationController
  def index
    @users = User.all
    respond_to do |format|
      format.json
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
