class Note < ActiveRecord::Base
  attr_accessible :text

  validates :text, :presence => true
end
