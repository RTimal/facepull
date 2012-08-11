require 'test_helper'

class PictureControllerTest < ActionController::TestCase
  test "should get getandsave" do
    get :getandsave
    assert_response :success
  end

end
