class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception

  def current_user
  	@current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login user
  	session[:session_token] = user.reset_session_token!
  end

  def logout
    session[:session_token] = nil
    current_user.reset_session_token!
    @current_user = nil
  end
  
end
