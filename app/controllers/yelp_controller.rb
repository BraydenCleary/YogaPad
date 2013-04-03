class YelpController < ApplicationController

	def index
		consumer_key = '8ucfXv9o4bepqvDLD-COhA'
		consumer_secret = '3ZZTWzuUG8CfKtBzJyxOO4ZS8z8'
		token = 'aYZ1-B8K3cxie8Jq8kJItqmZ0X1F39Jy'
		token_secret = 'Y4-ii_xe4SLz3dWFCQOBH0cdGqo'

		api_host = 'api.yelp.com'

		consumer = OAuth::Consumer.new(consumer_key, consumer_secret, {:site => "http://#{api_host}"})
		access_token = OAuth::AccessToken.new(consumer, token, token_secret)

		path = "/v2/search?term=Yoga&location=#{params['zipcode']}"

		master_hash = access_token.get(path)

		@response = JSON.parse(master_hash.body)
	end

end
