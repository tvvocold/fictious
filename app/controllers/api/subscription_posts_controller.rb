class Api::SubscriptionPostsController < ApplicationController
  def index
    @subscription_posts = current_user.subscription_posts
    render :json => @subscription_posts
  end
end
