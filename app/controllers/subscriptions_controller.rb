class SubscriptionsController < ApplicationController
  def create
    @subscription = current_user.subscriptions.new(user_id: params[:user_id])
    if @subscription.save
      redirect_to :back
    else
      flash.now[:errors] = @subscription.errors.full_messages
      redirect_to :back
    end
  end

  def destroy

  end

  def index
    @subscriptions = current_user.subscriptions
  end
end
