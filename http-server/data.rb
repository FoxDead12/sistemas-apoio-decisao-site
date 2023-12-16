require_relative "baser.rb"

class GetData < Base
  get '/data' do
    exec_perform(false, lambda do
      validateUser # METHOD TO VALIDATE USER

      body = Hash.new
      body[:parks] = DB.fetch("SELECT id, name FROM parks").all
      body[:params] = DB.fetch("SELECT id, name FROM params").all
      body[:weight_params] = DB.fetch("SELECT w.id_compare, w.id_to, w.value, p.name as Who, p2.name as To FROM weight_params w LEFT JOIN params p ON w.id_compare = p.id LEFT JOIN params p2 ON w.id_to = p2.id").all
      body[:parks_params] = DB.fetch("select p.id as id, p.name as park, pp.value as value, ps.name as prop from parks p LEFT JOIN  params_parks pp ON p.id = pp.id_park LEFT JOIN params ps ON ps.id = pp.id_param").all

      return body.to_json
    end)
  end
end
