Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'bookstores/index'
      post 'bookstores/create'
      get '/show/:id', to: 'bookstores#show'
      delete '/destroy/:id', to: 'bookstores#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
