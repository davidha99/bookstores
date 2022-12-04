class Book < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true
  validates :year, presence: true
  has_many :copies, dependent: :destroy
  has_many :bookstores, through: :copies, dependent: :destroy
end
