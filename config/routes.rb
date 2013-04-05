YogaPad::Application.routes.draw do
  root :to => "notes#index"

  resources :notes

  resources :users, only: :create

  get '/signout' => 'sessions#destroy'
  post '/signin' => 'sessions#create'

  get '/search' => 'yelp#index'


end
