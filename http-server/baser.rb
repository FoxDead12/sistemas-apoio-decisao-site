require "sinatra/base"
require "sequel"
require "json"
require "bcrypt"
require "jwt"
require "byebug"


class Base < Sinatra::Base
  DB = Sequel.connect('postgres://sequel_user:123@localhost/sistemas_apoio_decisao')
  SECRET = 'SECRET CODE'

  before do
    if (request.post?)
      request_body = JSON.parse(request.body.string)
      @data_request = request_body.transform_keys(&:to_sym)
    end
  end

  def exec_perform (rolbar, block)
    begin

      return block.call

    rescue StandardError => error # SERVER   ERROS
      puts error
      return error_response({message: 'Ocorreu algum erro, tente de novo mais tarde!'}, 501)

    rescue Exception => error # User ERROS
      puts error
      return error_response({message: error})
    rescue => error
      puts error
    end
  end

  def error_response (data, status = 403)
    status status
    data.to_json
  end

  def hash_password (password)
    return BCrypt::Password.create(password)
  end

  def hash_password_check (hash, password)
    user_hash = BCrypt::Password.new(hash)
    puts  user_hash, password, user_hash == password
    if user_hash == password
      # Password matches
      puts "Password is correct"
    else
      # Password does not match
      puts "Password is incorrect"
    end
  end

  def generate_token (email)
    payload = {:email => email}
    token = JWT.encode payload, SECRET, 'none'
  end
end
