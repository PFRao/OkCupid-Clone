class Like < ActiveRecord::Base

  belongs_to :liker, class_name: "User", foreign_key: :liker_id, primary_key: :id
  belongs_to :likee, class_name: "User", foreign_key: :likee_id, primary_key: :id

  def self.find_by_the_two_people(yetis)
    like = Like.find_by(yetis)
		like
  end

end
