class Bookstore < ApplicationRecord
  validates :codename, presence: true
  validates :address, presence: true
  validates :phone, presence: true
  has_many :copies, dependent: :destroy
  has_many :books, through: :copies, dependent: :destroy
end
