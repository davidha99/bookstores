Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'books/create'
      post 'books/update/:id', to: 'books#update'
      get 'books/show/:id', to: 'books#show'
      delete 'books/destroy/:id', to: 'books#destroy'
      get 'bookstores/index'
      post 'bookstores/create'
      get 'bookstores/show/:id', to: 'bookstores#show'
      delete '/destroy/:id', to: 'bookstores#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
