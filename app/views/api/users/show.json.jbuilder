json.extract! @user, :id, :username, :birthdate, :personality, :location, :last_online, :gender, :likers, :likees, :profile

json.visitors @user.visitors do |visitor|
  json.extract! visitor, :id, :birthdate, :location, :gender, :personality
  json.last_visit visitor.last_visit(@user)
end

json.visitees @user.visitees do |visitee|
  json.extract! visitee, :id, :birthdate, :location, :gender, :personality
  json.last_visit @user.last_visit(visitee)
end
