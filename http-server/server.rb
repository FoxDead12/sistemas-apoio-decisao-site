# REQUIRE GEMS
require 'sinatra'
require 'sequel'

# SERVER CONFIGS
set :port, 3001
set :public_folder, '../dist/'
DB = Sequel.connect('postgres://sequel_user:123@localhost:5432/sequel_test')

get '/*' do
  File.read(File.join('../dist', 'index.html'))
end

# EXAMPLE WORKIN WIDTH DATABASE POSTGRESS
# get '/' do
#   # 'Hello world!'
#   result = DB[:people]
#   return result.all.to_json
# end

# get '/add/:name/:age' do
#   # Extract data from URL Params
#   name = params["name"]
#   age = params["age"].to_i
#   # create query to add
#   result = DB["INSERT INTO people (name, age) VALUES (?, ?)", name, age]
#   # run the insert query
#   result.insert(1)
#   return "Record added"
# end
