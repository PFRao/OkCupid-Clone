Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :show, :update, :destroy]
    resource :session, only: [:create, :destroy, :show]
    resources :peeps
    resources :questions
    resources :answers
    resources :likes, only: [:create, :destroy]
  end

  root "static_pages#root"
end
