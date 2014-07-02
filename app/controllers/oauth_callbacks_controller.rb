class OauthCallbacksController < ApplicationController
  def facebook
    user = User.find_or_create_by_fb_auth_hash(request.env['omniauth.auth'])
    if user
      if request.env['omniauth.auth'][:info][:image]
        user.profile_picture =
                    URI.parse(request.env['omniauth.auth'][:info][:image]).to_s.gsub('http://','https://') + '?width=800&height=800'
      end
      redirect_to :root
      log_in(user)
    else

    end

  end
end
