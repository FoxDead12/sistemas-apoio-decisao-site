require "sinatra/base"
require 'sequel'

class Base < Sinatra::Base
  DB = Sequel.connect('postgres://sad:sad@localhost/sistemas_apoio_decisao')
end
