class User < ActiveRecord::Base

  attr_reader :password

	validates :username, :password_digest, :session_token, presence: true
	validates :username, uniqueness: true
	validates :password, length: {minimum: 6}, allow_nil: :true

	after_initialize :ensure_session_token
	# before_validation :ensure_session_token_uniqueness

  has_many :answers
  has_many :questions, through: :answers, source: :question

  has_many :incoming_likes, class_name: "Like", foreign_key: :likee_id, primary_key: :id
  has_many :outgoing_likes, class_name: "Like", foreign_key: :liker_id, primary_key: :id

  has_many :likers, through: :incoming_likes, source: :liker
  has_many :likees, through: :outgoing_likes, source: :likee

  has_many :incoming_visits, class_name: "Visit", foreign_key: :visitee_id, primary_key: :id
  has_many :outgoing_visits, class_name: "Visit", foreign_key: :visitor_id, primary_key: :id

  has_many :visitors, through: :incoming_visits, source: :visitor
  has_many :visitees, through: :outgoing_visits, source: :visitee

  has_many :gotten_messages, class_name: "Message", foreign_key: :receiver_id, primary_key: :id
  has_many :sent_messages, class_name: "Message", foreign_key: :sender_id, primary_key: :id

  has_many :correspodentsA, through: :gotten_messages, source: :sender_id
  has_many :correspodentsB, through: :sent_messages, source: :receiver_id

  has_many :conversationsA, class_name: "Conversation", foreign_key: :user_id, primary_key: :id
  has_many :conversationsB, class_name: "Conversation", foreign_key: :user2_id, primary_key: :id

  has_one :profile

  def last_visit(user)
    self.outgoing_visits.each do |visit|
      return visit.updated_at if visit.visitee_id == user.id
    end
  end

  def correspodents
    self.correspodentsA | self.correspodentsB
  end

  def conversations
    self.conversationsA | self.conversationsB
  end

	def password= password
		self.password_digest = BCrypt::Password.create(password)
		@password = password
	end

	def self.find_by_credentials username, password
		user = User.find_by(username: username)
		return nil unless user
		user.password_is?(password) ? user : nil
	end

	def password_is? password
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = new_session_token
		# ensure_session_token_uniqueness
		self.save
		self.session_token
	end

	private

	def ensure_session_token
		self.session_token ||= new_session_token
	end

	def new_session_token
		SecureRandom.base64
	end

	# def ensure_session_token_uniqueness
	# 	while User.find_by(session_token: self.session_token)
	# 		self.session_token = new_session_token
	# 	end
	# end

end
