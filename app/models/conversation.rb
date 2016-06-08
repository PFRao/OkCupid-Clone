class Conversation < ActiveRecord::Base

  has_many :messages, class_name: "Message", foreign_key: :convo_id, primary_key: :id

end
