class Api::ProfilesController < ApplicationController

  def show
    @profile = Profile.find_by(user_id: params[:id])
    render "api/profiles/show"
  end

  def create
    @profile = Profile.new(user_id: profile_params[:user_id])
    if @profile.save
      render "api/profiles/show"
    else
      render json: @profile.errors, status: 422
    end
  end

  def update
    theUser = User.find(params[:id])
    @profile = theUser.profile

    if @profile.update(profile_params)
      render "api/profiles/show"
    else
      render json: @profile.errors, status: 422
    end
  end

  private
  def profile_params
    params.require(:profile).permit(:self_summary, :do_with_life, :real_good_at, :first_thing, :favorites, :six_things, :think_about, :typical_friday, :message_if, :user_id)
  end

end
