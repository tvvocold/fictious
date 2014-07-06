Rails.application.routes.draw do
  get '/auth/facebook/callback', to: 'oauth_callbacks#facebook'

  namespace :api do
    resources :subscriptions
    resources :collections
    post 'collections/search', :to => "collections#search"
    resources :users
    resources :comments
    resources :collection_feeds
    get 'posts/subscription_feed', :to => "posts#subscription_feed", :as => "reading_list"
    resources :posts
    resources :notifications
  end

  root :to => "posts#recent"
  
  get 'posts/subscription_feed', :to => "posts#subscription_feed", :as => "reading_list"
  shallow do
    resources :users do
      resources :posts do
        resources :likes, only: [:create, :destroy]
        resources :collection_feeds, only: [:create, :destroy]
        resources :comments
      end
      resources :collections
      resources :subscriptions, only: [:create, :destroy, :index]
      resources :groups do
        resources :group_requests, only: [:create, :destroy]
      end
      resources :group_users, only: [:create, :destroy]
    end
  end
  resource :session
  resources :notifications, only: [:create, :destroy, :index, :update]
end
