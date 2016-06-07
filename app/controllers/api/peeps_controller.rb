class Api::PeepsController < ApplicationController

	def index
    @users = User.all
    render "api/peeps/index"
	end

  def show
    @user = User.find(params[:id])
    render "api/users/show"
  end

  def update
  end

  def destroy
  end

	private

	def user_params
		params.require(:user).permit(:id, :username, :birthdate, :password_digest, :personality, :location, :last_online, :gender)
	end

end
