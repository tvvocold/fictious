class Api::SubscriptionsController < ApplicationController
  def index
    # @subscriptions = (current_user.subscription_posts + current_user.collection_sub_posts).uniq
    @subscriptions = Subscription.all
    render :json => @subscriptions
  end

  def create
    if subscription_params[:user_id]
      @subscription = Subscription.new(user_id: subscription_params[:user_id])
    else
      @subscription = Subscription.new(collection_id: subscription_params[:collection_id])
    end
    @subscription.subscriber_id = current_user.id
    if @subscription.save
      message = current_user.username + " subscribed to your posts!"
      if !Notification.find_by(user_id: subscription_params[:user_id], content: message)
        @subscription.notifications.create(content: message, user_id: subscription_params[:user_id], new: true, url: "/#/users/" + current_user.id.to_s)
      end
      render :json => @subscription
    else
      flash.now[:errors] = @subscription.errors.full_messages
      redirect_to :back
    end
  end

  def show
    @subscriptions = current_user.subscriptions
    render :json => @subscriptions
  end

  def destroy
    @subscription = Subscription.find(params[:id])
    @subscription.destroy()
    render :json => @subscription
  end

  private

  def subscription_params
    params.require(:subscription).permit(:user_id, :collection_id)
  end
end
