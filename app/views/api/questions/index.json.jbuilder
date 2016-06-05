json.array! @questions do |qq|
  json.extract! qq, :id, :description
end
