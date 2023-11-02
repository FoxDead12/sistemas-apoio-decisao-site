require_relative "../baser.rb"

class Register < Base
  post '/register' do
    exec_perform(true, lambda do
      # Check if already exist user width email
      count = DB.fetch <<-SQL
        SELECT count(u.id) FROM public.users u WHERE u.email like '#{@data_request[:email]}';
      SQL

      count.each do |row|
        if (row[:count] != 0)
          raise Exception.new "Já existe um utilizador com este email."
        end
      end

      password_hash = hash_password @data_request[:password]

      result = DB.fetch <<-SQL
        INSERT INTO public.users (email, password_hash, name) VALUES ('#{@data_request[:email]}', '#{password_hash}', '#{@data_request[:name]}');
      SQL

      token = generate_token (@data_request[:email])
    end)
  end
end
