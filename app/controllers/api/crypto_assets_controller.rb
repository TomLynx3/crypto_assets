
require_relative '../base_response'
require 'net/http'

module Api
    class CryptoAssetsController < ApplicationController
        wrap_parameters false

        before_action :authentication
        def index
            render json: {"msg":@user_id}
        end
        
        def create
           
            crypto_asset = check_if_crypto_asset_exist create_asset_params[:symbol]

             res = BaseResponse.new(true,nil,nil)

            if crypto_asset
                
                asset = CryptoAsset.new(
                {
                user_id: @user_id,
                icon_url: "https://cryptoicon-api.vercel.app/api/icon/#{create_asset_params[:symbol].downcase}",
                symbol:create_asset_params[:symbol],
                api_id:crypto_asset["id"],
                amount: create_asset_params[:amount],
                fiat_amount: create_asset_params[:fiat_amount],
                })
            
            if asset.save
                res.result = asset
            else
                res.success=false
                res.errorMsg = "Oops..Something went wrong"
            end
                
            else
                res.success=false
                res.errorMsg = "Crypto currency doesn't exist"
            end
               

            render json: res
        end

        def get_profit
            begin
            res = BaseResponse.new(true,nil,nil)

            assets = CryptoAsset.select("SUM(crypto_assets.amount) as amount , SUM(crypto_assets.fiat_amount) as fiat_amount, crypto_assets.symbol as symbol").group(:symbol).where(user_id:@user_id)

            fiat_total = 0
            crypto_to_eur = 0;

           
                assets.each do |x|
                
                fiat_total += x[:fiat_amount]
                crypto_to_eur += get_current_asset_rate(x[:symbol],x[:amount])[:price]
                # logger.
                end
            rescue =>error 
                res.success = false
                res.errorMsg = error.message
                
            end

            res.result = {fiat_total:fiat_total , crypto_to_eur:crypto_to_eur}

            render json: res
        end

        def get_asset_items
            begin
            res = BaseResponse.new(true,nil,nil)
            
            assets = CryptoAsset.select("SUM(crypto_assets.amount) as amount , SUM(crypto_assets.fiat_amount) as fiat_amount, crypto_assets.symbol as symbol").group(:symbol).where(user_id:@user_id)
            result =[]
             assets.each do |x|
                asset_conversation = get_current_asset_rate(x[:symbol],x[:amount])
                asset_rate = get_current_asset_rate(x[:symbol],1)
                result.push({
                    full_name:asset_conversation[:name],
                    symbol:x[:symbol],
                    amount:x[:amount],
                    fiat_amount_invested:x[:fiat_amount],
                    current_rate:asset_rate[:price],
                    total:asset_conversation[:price],
                    profit:asset_conversation[:price] - x[:fiat_amount],
                    profit_ratio:(asset_conversation[:price] - x[:fiat_amount])/x[:fiat_amount] *100
                })
                end
           
            rescue  =>error
                res.success = false
                res.errorMsg = "Server Error"
                logger.info(error)
            end

            res.result = result
        
            render json: res
        end

        private
        def create_asset_params
            params.permit(:symbol,:amount,:fiat_amount)
        end

        def check_if_crypto_asset_exist(symbol)

             url = URI(ENV['API_URL_PRICE_CONVERSATION'])
          
            params = {:amount=>1,:symbol=>symbol,:convert=>"EUR"}
            url.query = URI.encode_www_form(params)
       
                http  = Net::HTTP.new(url.host,url.port)
                http.use_ssl = true
                req = Net::HTTP::Get.new(url)
                req['X-CMC_PRO_API_KEY'] = ENV["API_KEY"]
                req['Content-Type'] = 'application/json'
                res = http.request(req)
                body = JSON.parse(res.body)
                return body["data"]
        end

        def get_current_asset_rate(symbol,amount)
            url = URI(ENV['API_URL_PRICE_CONVERSATION'])

            params = {:amount=>amount,:symbol=>symbol,:convert=>"EUR"}

            url.query = URI.encode_www_form(params)

            http  = Net::HTTP.new(url.host,url.port)
            http.use_ssl = true

            req = Net::HTTP::Get.new(url)

            req['X-CMC_PRO_API_KEY'] = ENV["API_KEY"]

            req['Content-Type'] = 'application/json'

            res = http.request(req)

            body = JSON.parse(res.body)
            # logger.info(body["data"]["name"])
            return {price:body["data"]["quote"]["EUR"]["price"],name:body["data"]["name"]}
        end
    end
end 