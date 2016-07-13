require 'pusher'

class Api::MessagesController < ApplicationController

  def create
    @message = Message.new(message_params)

    if @message.save
      Pusher.trigger('convo_' + @message.convo_id.to_s, 'message_sent', {})
      Pusher.trigger('user_' + @message.receiver_id.to_s, 'notify_user', {})
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

  def update
    @message = Message.find(params[:id])

    if @message.update(message_params)
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
    params.require(:message).permit(:sender_id, :receiver_id, :body, :convo_id, :unread)
  end

end
