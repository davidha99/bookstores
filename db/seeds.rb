# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'faker'

Bookstore.destroy_all
Book.destroy_all

9.times do |i|
  bookstore = Bookstore.create!(
    codename: "Bookstore #{i + 1}",
    address: Faker::Address.full_address,
    phone: Faker::PhoneNumber.cell_phone,
    image: Faker::Avatar.image
  )

  10.times do |n|
    srand
    bookstore.books.create!(
      title: Faker::Book.title,
      author: Faker::Book.author,
      year: Faker::Date.between(from: '1950-09-23', to: '2014-09-25').year,
      quantity: rand(1..50)
    )
  end
end


