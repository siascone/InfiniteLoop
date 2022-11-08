class Api::SessionsController < ApplicationController
  def show
    @user = current_user
    if @user
      # render 'api/users/show'
      render json: @user
    else
      render json: { user: nil }
    end
  end

  def create
    @user = User.find_by_credentials(params[:credential], params[:password])

    if @user
      login!(@user)
      render json: @user
    else
      render json: { errors: ['Invalid credentials.'] }, status: :unauthorized
    end
  end

  def destroy
    logout!
    render json: { message: "Successfully logged out."}
  end
end
