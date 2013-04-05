require 'spec_helper'

describe User do
	it { should respond_to(:username) }
  it { should respond_to(:email) }
  it { should respond_to(:notes) }


  it { should validate_presence_of(:username)}
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email)}

end
