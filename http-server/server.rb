require 'sinatra'
require_relative 'auth/login.rb'

# SERVER CONFIGS
set :port, 3001
set :public_folder, '../dist/'

use Login

get '/*' do
  File.read(File.join('../dist', 'index.html'))
end
