json.array! @users do |user|
  json.extract! user, :id, :username, :birthdate, :password_digest, :personality, :location, :session_token
end
