YogaPad::Application.routes.draw do
  root :to => "notes#index"

  resources :notes

  resources :users, only: :create

  get '/search' => 'yelp#index'
end
