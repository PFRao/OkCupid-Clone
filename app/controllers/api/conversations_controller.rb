class Api::ConversationsController < ApplicationController

  def index
    @conversations = Conversation.where("user_id = :user OR user2_id = :user", { user: convo_params[:user_id]})

    render "api/conversations/index"
  end

  private
  def convo_params
    params.require(:conversation).permit(:user_id, :user2_id)
  end

end
