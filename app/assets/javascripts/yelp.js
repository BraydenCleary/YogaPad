function Result(search_result){
	this.name = 				 search_result.name
	this.rating = 			 search_result.rating
	this.phone = 				 search_result.phone
	this.address = 			 search_result.location.address[0]
	this.city = 				 search_result.location.city
	this.zipcode = 			 search_result.location.postal_code
	this.ratingImage = 	 search_result.rating_img_url
	this.businessImage = search_result.image_url

	this.render = function(){
		$('.yelp-results').append("<li>" + this.name + "</li>")
	}

}


$(document).ready(function(){

	$('.yelp-search').on('submit', function(event){
		event.stopPropagation();
		event.preventDefault();
		$.ajax({
			url: $(this).attr('action'),
			type: $(this).attr('method'),
			data: $(this).serialize(),
			success: function(response){
				var search_results = response.businesses
				for (var i in search_results){
					var result = new Result(search_results[i])
					result.render();
				}
			}
		});
	});
});
