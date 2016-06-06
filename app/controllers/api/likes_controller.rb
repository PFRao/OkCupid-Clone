class Api::LikesController < ApplicationController

  def create
    @like = Like.new(like_params)

    if @like.save
      render "api/likes/show"
    else
      render json: @like.errors, status: 422
    end
  end

  def destroy
    @like = Like.find_by_the_two_people(like_params)

    if @like
      @like.destroy
      render "api/likes/show"
    else
      render json: @like.errors, status: 422
    end
  end

  private
  def like_params
    params.require(:like).permit(:liker_id, :likee_id)
  end

end
