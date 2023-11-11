require 'axlsx'
require_relative "../baser.rb"

class Algorithm < Base
  post '/algorithm' do
    exec_perform(false, lambda do
      validateUser # METHOD TO VALIDATE USER

      # FIRST, CALCULATE (SUM), of each column
      sum_cost = Array.new # SUM EXAMPLES [1, 4.2, 5.4] [(PRECO), (DESEMPENHO), [ETC]], each column in horizontal
      (0..@data_request[:cost].length - 1).step(1).each do |column_i|
        sum = 0
        (0..@data_request[:cost].length - 1).step(1).each do |row_i|
          sum += @data_request[:cost][row_i][column_i]
        end
        sum_cost << sum
      end

      # SECOND, CALCULATE (WEIGHTS), of each prop
      weight_props = Array.new
      (0..@data_request[:cost].length - 1).step(1).each do |column_i|
        (0..@data_request[:cost].length - 1).step(1).each do |row_i|
          if weight_props[row_i].nil?
            weight_props << Array.new
          end
          weight_props[row_i][column_i] = (@data_request[:cost][row_i][column_i].to_f / sum_cost[column_i].to_f).round(3)
        end
      end

      # THIRD, NEED CALCULATE (SUM) each prop weight
      sum_weight_props = Array.new # SUM EXAMPLES [1, 4.2, 5.4] [LINHA 1, LINHA 2, [ETC]], each column in VERTICAL
      weight_props.each do |row|
        sum = 0
        row.each do |column|
          sum += column.to_f.round(3)
        end
        sum_weight_props << (sum / row.length).round(3)
      end

      # FOUR AND LAST, calculate the matrix
      matrizJuz = Array.new
      @data_request[:items].each_with_index do |row, row_i|
        matrizJuz << Array.new
        row.each_with_index do |column, column_i|
          if (column_i != 0) # IGNORE FIRST COLUMN
            matrizJuz[row_i][column_i] = (column.to_f * sum_weight_props[column_i - 1]).round(3)
          else
            matrizJuz[row_i][column_i] = column
          end
        end
      end

      matrizJuz = matrizJuz.sort_by { |subarray| subarray[1..].sum }.reverse

      # Create a new workbook and worksheet
      line_headers_execl = Array.new
      line_headers_execl << 'Nome'
      @data_request[:criteria].each do |criteria|
        line_headers_execl << criteria["name"]
      end
      line_headers_execl << 'Total'

      workbook = Axlsx::Package.new
      worksheet = workbook.workbook.add_worksheet(name: 'Sheet1')

      # Add data to the worksheet
      header_style = workbook.workbook.styles.add_style(bg_color: 'FF0000', fg_color: 'FFFFFF', b: true)
      worksheet.add_row line_headers_execl, style: header_style


      matrizJuz.each do |row|
        sum_total = row[1..].sum()
        row[row.length] = sum_total
        worksheet.add_row row
      end

      # Save the workbook
      name_file = 'matriz_julgamentos_' + Time.now.strftime('%Y-%m-%d %H:%M:%S.%L').gsub!(' ', '__')
      workbook.serialize("../tmp/#{name_file}.xlsx")

      return {file: name_file + '.xlsx'}.to_json
    end)
  end
end
