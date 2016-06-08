class Conversation < ActiveRecord::Base

  has_many :messages, class_name: "Message", foreign_key: :convo_id, primary_key: :id

  belongs_to :user
  belongs_to :user2, class_name: "User", foreign_key: :user2_id, primary_key: :id

end
