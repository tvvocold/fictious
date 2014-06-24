Rails.application.routes.draw do
  root :to => "posts#recent"

  shallow do
    resources :users do
      resources :posts do
        resources :likes, only: [:create, :destroy]
        resources :collection_feeds, only: [:create, :destroy]
      end
      resources :collections
    end
  end

  resource :session
end
