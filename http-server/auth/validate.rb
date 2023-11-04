require_relative "../baser.rb"

class Validate < Base
  get '/validate' do
    exec_perform(false, lambda do
      token_payload = decode_token(@data_request[:token])

      count = DB.fetch <<-SQL
        SELECT name, email FROM public.users u WHERE u.email like '#{token_payload[:email]}';
      SQL

      user = nil
      count.each do |row|
        user = row
      end

      if (user.nil?)
        raise Exception.new "Utilizador invalido!"
      end

      result = Hash.new
      result = {
        name: user[:name],
        email: user[:email]
      }.to_json

      return result
    end)
  end
end
