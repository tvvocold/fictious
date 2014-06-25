class GroupUsersController < ApplicationController
  def create
    @group_user = current_user.group_users.create(group_id: params[:group_user][:group_id])
    @notification = current_user.notifications.find_by(content_id: params[:group_user][:group_id])
    @group_request = current_user.group_requests.find_by(group_id: params[:group_user][:group_id])
    @notification.destroy()
    @group_request.destroy()
    redirect_to :back
  end

  def destroy

  end
end
