var Results = {
	init: function(results){
		this.results = this.splitResults(results, 3);
	},
	splitResults: function(source, groups) {
		var grouped = [];
		groupSize = Math.ceil(source.length/groups);
   	var queue = source;
   	for (var r=0;r<groups;r++) {
    	grouped.push(queue.splice(0, groupSize));
    }
    return grouped;
	},
	displayMore: function(){
		if (this.results.length > 0){
			$('.yelp-results').append("<span class='more'>MORE</span>")
		}
	},

	renderResults: function(){
		var initialResults = this.results.splice(0,1)[0]
		for (i in initialResults){
			var result = new Result(initialResults[i]);
			result.render();
		}
		this.displayMore();
	}

}

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
				Results.init(search_results)
				Results.renderResults();
			}
		});
	});

	$('ul').on('click', function(e){
		if ($(e.target).attr('class') == 'more'){
			$(e.target).hide();
			Results.renderResults();
		}
	})

});
