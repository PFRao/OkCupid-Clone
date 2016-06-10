class AddImageUrlToUsers < ActiveRecord::Migration
  def change
    change_column_default :users, :image_url, "http://res.cloudinary.com/di4l0rwwz/image/upload/v1465569852/xvtakubbgwsz9rhpqe6h.jpg"
  end
end
