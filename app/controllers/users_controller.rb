class UsersController < ApplicationController
  # for testing at the moment
  def show
    @user = User.find(params[:id])
    render :show
  end

end
