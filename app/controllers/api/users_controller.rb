class Api::UsersController < ApplicationController

	def create
		@user = User.new(user_params)

		if @user.save
			login(@user)
			render "api/users/show"
		else
			# puts @user.errors
      render(
        json: {
          base: @user.errors.full_messages
        },
        status: 401
      )
		end
	end

  def show

  end

  def update
    @user = User.find(user_params[:id])
    puts "RIGHT NOW, THE USER'S SESSION TOKEN IS:"
    puts "                                      :"
    puts "                                      :"
    puts @user.session_token
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
		params.require(:user).permit(:id, :username, :password, :birthdate, :password_digest, :personality, :location, :last_online, :gender, :image_url)
	end

end
