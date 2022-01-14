class CryptoAsset < ApplicationRecord
    belongs_to :user
    validates :api_id, presence: true
    validates :icon_url, presence: true
    validates :symbol, presence: true
    validates :amount,presence: true
    validates :fiat_amount, presence: true
end
