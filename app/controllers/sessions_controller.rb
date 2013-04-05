class SessionsController < ApplicationController

	def create
		user = User.authenticate(params[:session][:email], params[:session][:password])
		if user.nil?
			render :json => { :error => 'Incorrect email/password' }
		else
			sign_in(user)
			render :json => user.to_json
		end
	end

	def destroy
		sign_out
		render :json => { :status => 'Successfully signed out.'}
	end


end

