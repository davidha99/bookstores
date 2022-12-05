class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :author, null: false
      t.string :year, null: false
      t.integer :quantity
      t.references :bookstore, null: false, foreign_key: true

      t.timestamps
    end
  end
end
