json.array! @users do |user|
  json.extract! user, :id, :username, :birthdate, :password_digest, :personality, :gender, :location, :session_token, :likees, :likers
end
