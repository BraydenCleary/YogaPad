class SessionsController < ApplicationController

	def destroy
		sign_out
		render :json => { :status => 'Successfully signed out.'}
	end


end

