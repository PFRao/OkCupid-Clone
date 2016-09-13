require 'pusher'

class Api::ConversationsController < ApplicationController

  def index
    @conversations = Conversation.where("user_id = :user OR user2_id = :user", { user: convo_params[:user_id]})

    render "api/conversations/index"
  end

  def create
    @conversation = Conversation.new(convo_params)

    if @conversation.save
      render "api/conversations/show"
    else
      render(
        json: {
          base: ["Something went wrong!"]
        },
        status: 401
      )
    end
  end

  def show
    @conversation = Conversation.find(params[:id])

    render "api/conversations/show"
  end

  private
  def convo_params
    params.require(:conversation).permit(:user_id, :user2_id)
  end

end
