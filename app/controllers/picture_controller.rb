require 'net/http'
require 'net/https' if RUBY_VERSION < '1.9'
require 'uri'
require 'open-uri'

class PictureController < ApplicationController

  def getandsave
	  uri=URI.parse(params[:picurl])
	  location = Net::HTTP.get_response(uri)['location']
	  
	  File.open('app/assets/images/faceimage.gif', 'wb') do |fo|
			fo.write open(location).read
			send_data(fo , :filename => 'faceimage.gif', :type=>'image/gif')
	   end

	  #render :text => location
	end
	
end
