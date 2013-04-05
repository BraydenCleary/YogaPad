class UsersController < ApplicationController

  def create
    @user = User.new(params[:user])
    puts @user.save
    if @user.save
      sign_in @user
      render :json => @user.to_json
    else
      render :json => { :failure => true, :errors => @user.errors.full_messages }
    end
  end

end
