class Api::MessagesController < ApplicationController

  def create
    @message = Message.new(message_params)

    if @message.save
      render "api/messages/show"
    else
      render(
        json: {
          base: ["Something went horribly wrong!"]
        },
        status: 401
      )
    end
  end

  private
  def message_params
    params.require(:message).permit(:sender_id, :receiver_id, :body, :convo_id)
  end

end