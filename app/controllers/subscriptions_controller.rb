class SubscriptionsController < ApplicationController
  def create
    @user = User.find(params[:user_id])
    @subscription = Subscription.new(subscription_params)
    @subscription.subscriber_id = current_user.id
    if @subscription.save
      message = current_user.username + " subscribed to your posts!"
      @subscription.notifications.create(content: message, user_id: @user.id)
      redirect_to :back
    else
      flash.now[:errors] = @subscription.errors.full_messages
      redirect_to :back
    end
  end

  def destroy
    @subscription = Subscription.find(params[:id])
    @subscription.destroy()
    redirect_to :back
  end

  def index
    @subscriptions = current_user.subscriptions
  end

  private

  def subscription_params
    params.require(:subscription).permit(:user_id, :collection_id)
  end
end
