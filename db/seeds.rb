# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

9.times do |i|
  Bookstore.create(
    codename: "Bookstore #{i + 1}",
    address: 'Niños Heroes 2014, Zona Centro, 31000',
    phone: '205-323-2229'
  )
end
