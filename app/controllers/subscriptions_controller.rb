class SubscriptionsController < ApplicationController
  def create
    @subscription = Subscription.new(subscription_params)
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

  private

  def subscription_params
    params.require(:subscription).permit(:user_id, :collection_id)
  end
end
