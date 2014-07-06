class Api::NotificationsController < ApplicationController
  def index
    @notifications = current_user.notifications
    render :json => @notifications
  end

  def update
    @notification = Notification.find(params[:id])
    @notification.new = false
    @notification.save
    render :json => @notification
  end
end
