require "sinatra/base"
require "sequel"
require "json"
require 'bcrypt'



class Base < Sinatra::Base
  DB = Sequel.connect('postgres://sequel_user:123@localhost/sistemas_apoio_decisao')

  before do
    if (request.post?)
      @result = JSON.parse(request.body.string)
      @result = @result.transform_keys(&:to_sym)
    end
  end

  def error_response (data, status = 403)
    status status
    data.to_json
  end

  def hash_password (string)
    return BCrypt::Password.create(string, cost: 12, salt: 'OLA').to_s
  end

  def hash_password_check (hash, password)
    BCrypt::Password.new(hash) == password
  end

end
