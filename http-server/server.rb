require 'sinatra'
require_relative 'auth/login.rb'
require_relative 'auth/register.rb'

# SERVER CONFIGS
set :port, 3001
set :public_folder, '../dist/'

use Login
use Register



get '/*' do
  File.read(File.join('../dist', 'index.html'))
end
