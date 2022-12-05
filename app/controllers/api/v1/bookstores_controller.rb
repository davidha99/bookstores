class Api::V1::BookstoresController < ApplicationController
  before_action :set_bookstore, only: %i[show destroy]
  def index
    bookstore = Bookstore.all
    render json: bookstore
  end

  def create
    bookstore = Bookstore.create!(bookstore_params)
    if bookstore
      render json: bookstore
    else
      render json: bookstore.errors
    end
  end

  def show
    render json: @bookstore.books
  end

  def destroy
    @bookstore&.destroy
    render json: { message: 'Bookstore deleted!' }
  end

  private

  # To prevent wrong or malicious content from getting into the database.
  def bookstore_params
    params.permit(:codename, :address, :phone, :image)
  end

  def set_bookstore
    @bookstore = Bookstore.find(params[:id])
  end
end
