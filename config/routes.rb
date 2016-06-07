Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :show, :update, :destroy]
    resource :session, only: [:create, :destroy, :show]
    resources :peeps
    resources :questions
    resources :answers
    resources :likes, only: [:create, :destroy, :index]
    resources :visits, only: [:create, :destroy, :index, :show]
    resources :profiles
  end

  root "static_pages#root"
end
