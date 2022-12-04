class Book < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true
  validates :year, presence: true
  has_many :copies
  has_many :bookstores, through: :copies
end
