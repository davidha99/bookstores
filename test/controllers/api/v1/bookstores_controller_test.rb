require "test_helper"

class Api::V1::BookstoresControllerTest < ActionDispatch::IntegrationTest
  setup do
    @bookstore = bookstores(:bookstore1)
  end

  test "should get bookstores index" do
    get '/bookstores'
    assert_response :success
  end

  test "should create bookstore" do
    assert_difference('Bookstore.count') do
      post(
        api_v1_bookstores_create_url, params: { 
          codename: @bookstore.codename,
          address: @bookstore.address,
          phone: @bookstore.phone,
          image: @bookstore.image }
      )
    end
    assert_response :success
  end

  test "should show bookstore" do
    get '/show/:id'
    assert_response :success
  end

  test "should destroy bookstore" do
    assert_difference 'Bookstore.count', -1 do
      delete "/api/v1/destroy/#{ @bookstore.id }"
    end
    assert_response :success
  end

  test "should not save bookstore without codename address phone" do
    bookstore = Bookstore.new
    assert !bookstore.save, "Saved the bookstore without some required field: codename, address, phone"
  end
end
