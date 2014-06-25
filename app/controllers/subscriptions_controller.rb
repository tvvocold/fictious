class SubscriptionsController < ApplicationController
  def create
    @subscription = Subscription.new(user_id: params[:user_id])
    @subscription.subscriber_id = current_user.id
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
