class ApplicationController < ActionController::API


    

   SECRET = ENV['SECRET']

   @user_id = ""

   def frontend_index_html
        render file: 'public/index.html'
    end

    def authentication

        decode_data = decode_user_data(request.headers["x-auth-token"])

        # user_data = decode_data[0]["id"] unless !decode_data
        
        if decode_data
            logger.info(decode_data)
            @user_id = decode_data[0]["id"]
            return true
        else 
            render json: {error:"Invalid token"}
        end
    end

    def encode_user_data(payload)
        token = JWT.encode payload, SECRET, "HS256"
        return token
    end

    def decode_user_data(token)
        begin
            data = JWT.decode token, SECRET, true, { algorithm: "HS256" }
            return data
        rescue => e
            puts e
        end
    end

    def user_id
        @user_id
    end
end
