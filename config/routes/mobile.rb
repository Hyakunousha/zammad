# Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

Zammad::Application.routes.draw do
  get '/mobile', to: 'mobile#index'
  get '/mobile/*path', to: 'mobile#index'
end
