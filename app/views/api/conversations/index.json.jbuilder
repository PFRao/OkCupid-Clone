json.array! @conversations do |conversation|

  json.extract! conversation, :id, :user_id, :user2_id, :messages

end
