class GroupRequestsController < ApplicationController
  def create
    @user = User.find_by(username: params[:group_request][:username])
    @group_request = GroupRequest.new(user_id: @user.id, group_id: params[:group_id])
    if @group_request.save
      message = current_user.username + " sent you a Writers' Group invitation!"
      @group_request.notifications.create(content: message, user_id: @user.id, content_id: @group_request.id)
      redirect_to :back
    else
      flash.now[:errors] = "That user does not exist."
      redirect_to :back
    end
  end

  def destroy

  end
end
