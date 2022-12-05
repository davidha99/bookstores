class CreateBookstores < ActiveRecord::Migration[7.0]
  def change
    create_table :bookstores do |t|
      t.string :codename, null: false
      t.text :address, null: false
      t.string :phone, null: false
      t.string :image, default: 'https://robohash.org/sitsequiquia.png?size=300x300&set=set1'
      t.integer :books_count

      t.timestamps
    end
  end
end
