class Bookstore < ApplicationRecord
  validates :codename, presence: true
  validates :address, presence: true
  validates :phone, presence: true
  has_many :books, dependent: :destroy
end
