require_relative "../baser.rb"

class FileDownload < Base
  get '/excel' do
    exec_perform(false, lambda do
      validateUser(@data_request["token"])

      name_file = @data_request["name"]

      if (name_file.include?('../'))
        raise Exception.new "Diretorio Invalido!"
      end

      path = File.join('/tmp/', name_file)
      path =  File.expand_path(path)

      send_file path, :filename => name_file, :type => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', disposition: 'attachment'
    end)
  end
end
