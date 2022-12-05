class Api::V1::BooksController < ApplicationController
  before_action :set_book, only: %i[show destroy edit update]

  def index
    bookstore = Bookstore.all
    render json: bookstore
  end

  def create
    book = Book.create!(book_params)
    if book
      render json: book
    else
      render json: book.errors
    end
  end

  def edit
  end

  def update
  end

  def show
    render json: @book
  end

  def destroy
    @book&.destroy
    render json: { message: 'Book deleted!' }
  end

  private

  def book_params
    params.permit(:title, :author, :year)
  end

  def set_book
    @bookstore = Bookstore.find(params[:id])
  end
end
