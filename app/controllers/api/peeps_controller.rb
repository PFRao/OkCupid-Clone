class Api::PeepsController < ApplicationController

	def index
    @users = User.all
    render "api/peeps/index"
	end

  def show
  end

  def update
  end

  def destroy
  end

	private

	def user_params
		params.require(:user).permit(:id, :username, :birthdate, :password_digest, :preferences, :personality, :location, :last_online, :looking_for)
	end

end
