class Api::V1::BooksController < ApplicationController
  before_action :set_bookstore, only: %i[show destroy edit update create]

  # def index
  #   bookstore = Bookstore.all
  #   render json: bookstore
  # end

  def create
    book = @bookstore.books.create!(book_params)
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
    render json: @bookstore.books
  end

  # def destroy
  #   @book&.destroy
  #   render json: { message: 'Book deleted!' }
  # end

  private

  def book_params
    params.permit(:title, :author, :year, :quantity)
  end

  def set_bookstore
    @bookstore = Bookstore.find(params[:id])
  end
end
