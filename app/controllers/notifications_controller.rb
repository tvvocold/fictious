class NotificationsController < ApplicationController
  def index
    @notifications = current_user.notifications.where({ new: true })
  end

  def update
    @notification = Notification.find(params[:id])
    @notification.new = false
    if @notification.save
      render :json => @notification
    end
  end
end
