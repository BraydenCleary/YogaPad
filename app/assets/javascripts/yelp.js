var resultsView = {
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
	},

	checkValidSearch: function(input){
		if ($.isNumeric(input) && input.length == 5){
			return true;
		} else {
			return false;
		}
	},

	displaySearching: function(){
		$('.searching').show();
	},

	onYelpSearch: function(){
		$('.yelp-search').on('submit', function(event){
			resultsView.displaySearching();
			event.stopPropagation();
			event.preventDefault();
			var input = $("input[id='zipcode']").val()
			if (resultsView.checkValidSearch(input)){
				$.ajax({
					url: $(this).attr('action'),
					type: $(this).attr('method'),
					data: $(this).serialize(),
					success: function(response){
						resultsView.validSearch(response);
					}
				});
			} else {
				resultsView.invalidSearch();
			}
		});
	},

	validSearch: function(response){
		$('.searching').hide();
		$('.yelp-search').find("input[name='zipcode']").val(''); //clear search box
		$('.yelp-results').empty();
		var search_results = response.businesses
		resultsView.init(search_results)
		resultsView.renderResults();
	},

	invalidSearch: function(){
		$('.searching').hide();
		$('.invalid-zipcode').show();
		$(document).one('click', function(){
			$('.invalid-zipcode').hide();
		});
	},

	listenForMore: function(){
		$('ul').on('click', function(event){
			resultsView.renderMore(event);
		})
	},

	renderMore: function(event){
		if ($(event.target).attr('class') == 'more'){
			$(event.target).hide();
			resultsView.renderResults();
		}
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
	resultsView.onYelpSearch();
	resultsView.listenForMore();
});
