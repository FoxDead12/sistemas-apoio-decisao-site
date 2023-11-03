require_relative "../baser.rb"

class Login < Base
  post '/login' do
    exec_perform(false, lambda do
      # CODE GOES WIRE
      result_user = DB[:users].select(:id, :email, :password_hash).where(email: @data_request[:email]).all
      puts result_user
    end)
  end
end
