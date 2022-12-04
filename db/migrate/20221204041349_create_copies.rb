class CreateCopies < ActiveRecord::Migration[7.0]
  def change
    create_table :copies do |t|
      t.integer :quantity, null: false
      t.references :bookstore, null: false, foreign_key: true
      t.references :book, null: false, foreign_key: true

      t.timestamps
    end
    add_index :copies, %i[bookstore_id book_id], unique: true
  end
end
