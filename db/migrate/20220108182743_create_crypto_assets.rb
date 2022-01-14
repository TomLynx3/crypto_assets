class CreateCryptoAssets < ActiveRecord::Migration[7.0]
  def change
    create_table :crypto_assets, id: :uuid do |t|
      t.string :symbol
      t.integer :api_id
      t.text :icon_url
      t.decimal :amount ,precision:30, scale:9
      t.float :fiat_amount

      t.references :user, null: false , foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
