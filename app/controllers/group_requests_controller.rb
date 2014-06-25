class GroupRequestsController < ApplicationController
  def create
    @user = User.find_by(username: params[:group_request][:username])
    @group_request = GroupRequest.new(user_id: @user.id, group_id: params[:group_id])
    if @group_request.save
      redirect_to :back
    else
      flash.now[:errors] = "That user does not exist."
      redirect_to :back
    end
  end

  def destroy

  end
end
