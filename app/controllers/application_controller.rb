class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    return nil if session[:token].nil?
    @current_user ||= User.find_by(session_token: session[:token])
  end

  def logged_in?
    !!current_user
  end

  def log_in(user)
    @current_user = user
    session[:token] = user.reset_session_token!
  end

  def log_out
    session[:token] = nil
  end
end
