json.array! @conversations do |conversation|

  json.extract! conversation, :id, :user, :user2, :messages

end
