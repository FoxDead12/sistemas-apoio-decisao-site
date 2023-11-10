require 'sinatra'
require 'rack/cors'

require_relative 'auth/login.rb'
require_relative 'auth/register.rb'
require_relative 'auth/validate.rb'
require_relative 'algorithm/algorithm.rb'


# SERVER CONFIGS
set :port, 3001
set :public_folder, '../dist/'

configure do
  use Rack::Cors do
    allow do
      origins '*' # Replace '*' with the specific origin(s) you want to allow
      resource '*', headers: :any, methods: [:get, :post, :options]
    end
  end
end

use Validate
use Login
use Register
use Algorithm

get '/excel/:name' do
  name = params[:name]
  send_file "../tmp/#{name}", :filename => name, :type => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', disposition: 'attachment'
end

get '/*' do
  File.read(File.join('../dist', 'index.html'))
end
