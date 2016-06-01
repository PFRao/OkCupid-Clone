class Api::UsersController < ApplicationController

	def create
		@user = User.new(user_params)

		if @user.save
			login(@user)
			render "api/users/show"
		else
			render json: @user.errors, status: 422
		end
	end

  def show

  end

  def update
    @user = User.find(user_params[:id])

    if @user.update(user_params)
      render "api/users/show"
    else
      ender json: @user.errors, status: 422
    end
  end

  def destroy

  end

	private

	def user_params
		params.require(:user).permit(:id, :username, :password, :location, :last_online, :birthdate)
	end

end
