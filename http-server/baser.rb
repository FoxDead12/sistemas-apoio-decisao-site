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

    if (request.get?)
      @data_request = params.transform_keys(&:to_sym)
    end
  end

  def exec_perform (rolbar, block)
    begin

      return block.call

    rescue StandardError => error # SERVER   ERROS
      # puts error.backtrace
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
    return user_hash == password
  end

  def generate_token (email, user_id)
    payload = {:email => email, :id => user_id}
    expiration_time = Time.now.to_i + 3600
    token = JWT.encode payload, SECRET, 'HS256', exp: expiration_time
  end

  def decode_token (token)
    data = JWT.decode token, SECRET, false
    token_expiration = data[1]["exp"]

    if (token_expiration < Time.now.to_i)
      raise Exception.new "Seu token expirou!"
    end

    user_info = data[0].transform_keys(&:to_sym)
  end

  def validateUser ()

  end
end
