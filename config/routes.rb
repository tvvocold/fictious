Rails.application.routes.draw do
  get '/auth/:provider/callback', to: 'sessions#create'

  namespace :api do
    resources :subscriptions
    resources :users
    resources :comments
    get 'posts/subscription_feed', :to => "posts#subscription_feed", :as => "reading_list"
    resources :posts
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
  resources :notifications, only: [:create, :destroy, :index]
end
