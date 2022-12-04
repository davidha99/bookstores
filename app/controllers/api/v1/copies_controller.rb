class Api::V1::CopiesController < ApplicationController
  
  before_action :set_books, only: %i[show destroy edit update]

  def index
  end

  def create
  end

  def edit
  end

  def update
  end

  def show
    render json: @books
  end

  def destroy
  end

  private
  def set_books
    @books = Copy.books.where(bookstore: params[:id])
  end
end
