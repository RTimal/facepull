require 'net/http'
require 'net/https' if RUBY_VERSION < '1.9'
require 'uri'
require 'open-uri'

class PictureController < ApplicationController

  def getandsave
	  uri=URI.parse(params[:picurl])
	  File.open('public/images/upload/faceimage.gif', 'wb') do |fo|
			fo.write open(params[:picurl]).read
	   end

	  render :text => "uri"
	end
	
end
