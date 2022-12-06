class Api::V1::BooksController < ApplicationController
  before_action :set_bookstore, only: %i[show create]

  def create
    book = @bookstore.books.create!(book_params)
    if book
      render json: book
    else
      render json: book.errors
    end
  end

  def update
    book = Book.find(params[:id])
    if book.update(book_params)
      render json: book
    else
      render json: book.errors
    end
  end

  def show
    render json: @bookstore.books
  end

  def destroy
    book = Book.find(params[:id])
    if book&.destroy
      head :no_content, status: :ok
    else
      render json: book.errors, status: :unprocessable_entity
    end
  end

  private

  def book_params
    params.permit(:title, :author, :year, :quantity)
  end

  def set_bookstore
    puts params[:id]
    @bookstore = Bookstore.find(params[:id])
  end
end
