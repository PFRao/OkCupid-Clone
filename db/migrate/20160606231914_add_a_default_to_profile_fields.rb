class AddADefaultToProfileFields < ActiveRecord::Migration
  def change
    change_column_default :profiles, :self_summary, ""
    change_column_default :profiles, :do_with_life, ""
    change_column_default :profiles, :real_good_at, ""
    change_column_default :profiles, :first_thing, ""
    change_column_default :profiles, :favorites, ""
    change_column_default :profiles, :six_things, ""
    change_column_default :profiles, :think_about, ""
    change_column_default :profiles, :typical_friday, ""
    change_column_default :profiles, :message_if, ""
  end
end
