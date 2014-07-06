class Api::NotificationsController < ApplicationController
  def index
    @notifications = current_user.notifications
    render :json => @notifications
  end

  def create
    if !Notification.find_by(user_id: params[:user_id], content: params[:content])
      @notification = Notification.create(content: params[:content], user_id: params[:user_id], url: "/#/posts/" + params[:post_id].to_s, new: true)
      render :json => @notification
    else
      render :json => "AN"
    end
  end

  def update
    @notification = Notification.find(params[:id])
    @notification.new = false
    @notification.save
    render :json => @notification
  end
end
