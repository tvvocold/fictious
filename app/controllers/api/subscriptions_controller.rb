class Api::SubscriptionsController < ApplicationController
  def index
    @subscriptions = (current_user.subscription_posts + current_user.collection_sub_posts).uniq
    render :json => @subscriptions
  end
end
