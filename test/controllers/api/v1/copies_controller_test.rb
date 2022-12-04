require "test_helper"

class Api::V1::CopiesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_copies_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_copies_create_url
    assert_response :success
  end

  test "should get edit" do
    get api_v1_copies_edit_url
    assert_response :success
  end

  test "should get update" do
    get api_v1_copies_update_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_copies_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_copies_destroy_url
    assert_response :success
  end
end
