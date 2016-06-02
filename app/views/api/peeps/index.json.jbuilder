json.array! @users do |user|
  json.extract! user, :id, :username, :birthdate, :password_digest, :preferences, :personality, :location,  :last_online, :looking_for, :session_token
end
