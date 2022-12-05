class Book < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true
  validates :year, presence: true
  belongs_to :bookstore, counter_cache: true
end
