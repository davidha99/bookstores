class Bookstore < ApplicationRecord
  validates :codename, presence: true
  validates :address, presence: true
  validates :phone, presence: true
end
