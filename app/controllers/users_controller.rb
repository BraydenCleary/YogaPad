class UsersController < ApplicationController

  def create
    @user = User.new(params[:user])
    puts @user.inspect
    if @user.save
      sign_in @user
      render :json => @user.to_json
    else
      render :json => {message: "We've got some errors", errors: @user.errors.full_messages }
    end
  end

end
