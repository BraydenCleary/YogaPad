class User < ActiveRecord::Base
  attr_accessible :username, :email, :password

  has_many :notes

  has_secure_password

  validates :username,
            :presence => true,
            :length => {:minimum => 2, :maximum => 32},
            :format => {:with => /^\w+$/}

  validates :email,
            :presence => true,
            :format => {:with => /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i},
            :uniqueness => {:case_sensitive => false}

  validates :first_name, :last_name, :presence => true

  validates :password, :presence => true, :on => :create

  def self.authenticate(email, password)
    user = User.find_by_email(email)

    user && user.authenticate(password)
  end

  before_save { self.email.downcase! if self.email? }
end
