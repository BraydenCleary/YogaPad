class User < ActiveRecord::Base
  VALID_EMAIL_REGEX = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i
  attr_accessible :first_name, :last_name, :username, :email, :password, :password_confirmation

  has_many :notes

  has_secure_password

  validates :username,
            presence: true,
            length:  {minimum: 2, maximum: 32},
            format:  {with: /^\w+$/}

  validates :email,
            presence: true,
            format: {with: VALID_EMAIL_REGEX},
            uniqueness: {case_sensitive: false}

  validates :first_name, :last_name, presence: true

  validates :password, presence: true, on: :create

  before_save { self.email.downcase! if self.email? }

  def self.authenticate(email, password)
    user = User.find_by_email(email)

    user && user.authenticate(password)
  end

  def to_json
    self.key_attrs.to_json
  end

  def key_attrs
    { first_name: self.first_name, last_name: self.last_name, 
      username: self.username, email: self.email }
  end

end
