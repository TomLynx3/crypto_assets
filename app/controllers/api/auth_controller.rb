require_relative '../base_response'
module Api
    require 'bcrypt'
    class AuthController < ApplicationController
        wrap_parameters false
        include BCrypt
        before_action :authentication, only: [:check]

        def signup
            res = BaseResponse.new(false,nil,nil)

            user_in_db = User.find_by(username: signup_params[:username])
            
            if user_in_db
                res.errorMsg = "Username already in use"
            else
                user = User.new(
                {
                username: signup_params[:username],
                password:Password.create(signup_params[:password])
                })

                if user.save
                    token = encode_user_data({id:user[:id],username:user[:username]})
                    res.success = true;
                    res.result = token  
                else
                    res.errorMsg = "Oops..Something Went wrong"
                end
                
            end
            render json: res
        end

        def login
            
            res = BaseResponse.new(false,nil,nil)

            user = User.find_by(username: login_params[:username])

            if !user
                res.errorMsg = " User not found"
            else
                password_db = Password.new(user[:password])
                if password_db == login_params[:password]
                    token = encode_user_data({id:user[:id],username:user[:username]})
                    res.success = true
                    res.result = token
                else
                    res.errorMsg = "Invalid credentials"
                end
            end

            render json: res
        end

        
        def check
           res = BaseResponse.new(true,nil,nil)
           render json: res
        end

        private
        def signup_params
            params.permit(:username, :password)
        end

        def login_params
            params.permit(:username, :password)
        end
    end
end