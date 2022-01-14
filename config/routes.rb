Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace "api" do
    post "/signup", to: "auth#signup"
    post "/login", to: "auth#login"
    get "/check", to:'auth#check'
    get "/profit", to:'crypto_assets#get_profit'

    resources :crypto_assets
  end

   get '*path', to: 'application#frontend_index_html', constraints: lambda { |request|
      !request.xhr? && request.format.html?
    }

end
