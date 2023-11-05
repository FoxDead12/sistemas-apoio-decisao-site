require_relative "../baser.rb"

class Login < Base
  post '/login' do
    exec_perform(false, lambda do
      # CODE GOES WIRE
      result_user = DB[:users].select(:id, :name, :email, :password_hash).where(email: @data_request[:email]).limit(1)

      user = nil
      result_user.each do |row|
        user = row
      end

      if (user.nil?)
        raise Exception.new "Utilizador invalido!"
      end

      if (!hash_password_check(user[:password_hash], @data_request[:password]))
        raise Exception.new "Utilizador invalido!"
      end

      token = generate_token(@data_request[:email], user[:id])

      result = Hash.new
      result = {
        token: token,
        name: user[:name],
        email: user[:email]
      }.to_json

      return result
    end)
  end
end
