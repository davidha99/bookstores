require "test_helper"

class Api::V1::BookstoresControllerTest < ActionDispatch::IntegrationTest
  test "should get bookstores index" do
    get '/bookstores'
    assert_response :success
  end

  test "should create bookstore" do
    post api_v1_bookstores_create_url
    assert_response :success
  end

  test "should show bookstore" do
    get '/show/:id'
    assert_response :success
  end

  test "should destroy bookstore" do
    delete api_v1_bookstores_destroy_url
    assert_response :success
  end

  test "should not save bookstore without codename address phone" do
    bookstore = Bookstore.new
    assert !bookstore.save, "Saved the bookstore without some required field: codename, address, phone"
  end
end
