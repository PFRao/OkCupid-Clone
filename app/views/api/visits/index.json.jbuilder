json.array! @visits do |visit|
  json.extract! visit, :id, :visitor_id, :visitee_id
end
