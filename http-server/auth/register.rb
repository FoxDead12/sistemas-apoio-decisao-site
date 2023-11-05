require_relative "../baser.rb"

class Register < Base
  post '/register' do
    exec_perform(false, lambda do
      count = DB.fetch <<-SQL
        SELECT count(u.id) FROM public.users u WHERE u.email like '#{@data_request[:email]}';
      SQL

      count.each do |row|
        if (row[:count] != 0)
          raise Exception.new "Já existe um utilizador com este email"
        end
      end

      password_hash = hash_password @data_request[:password]
      DB[:users].insert(email: @data_request[:email], name: @data_request[:name], password_hash: password_hash)

      return
    end)
  end
end
