require_relative "../baser.rb"

class Register < Base
  post '/register' do
    # email = request.body[:email]
    # password = request.body[:password]

    # Check if already exist user width email
    count = DB.fetch <<-SQL
      SELECT count(u.id) FROM users u WHERE u.email like '#{@result[:email]}';
    SQL

    count.each do |row|
      if (row[:count] != 0)
        return error_response ({message: "Já existe um utilizador com este email."})
      end
    end

    password = hash_password(@request[:password])

    return password
  end

  post '/login' do
    result = hash_password_check(@result[:hash], '123')
    puts result
    return result
  end
end
