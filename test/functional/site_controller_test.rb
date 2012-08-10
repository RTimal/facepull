require 'test_helper'

class SiteControllerTest < ActionController::TestCase
  test "should get gallery" do
    get :gallery
    assert_response :success
  end

  test "should get login" do
    get :login
    assert_response :success
  end

  test "should get index" do
    get :index
    assert_response :success
  end

end
