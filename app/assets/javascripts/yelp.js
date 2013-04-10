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
		$('.yelp-notice').css('visibility', 'visible').text('Searching...')
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
						debugger
						resultsView.validSearch(response);
					}
				});
			} else {
				resultsView.invalidSearch();
			}
		});
	},

	displayLogo: function(){
		$('.results-by').show();
	},

	validSearch: function(response){
		$('.yelp-notice').css('visibility', 'hidden');
		$('.yelp-search').find("input[name='zipcode']").val(''); //clear search box
		$('.yelp-results').empty();
		var search_results = response.businesses
		resultsView.init(search_results)
		resultsView.renderResults();
		resultsView.displayLogo();
	},

	invalidSearch: function(){
		$('.yelp-notice').text('Invalid Zipcode')
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
	this.fallbackImage = "/assets/peace.jpeg"
	this.url =           search_result.url

	this.render = function(){
		if (this.businessImage !== undefined) {
			$('.yelp-results').append("<li><a href='" + this.url + "'><img src='" + this.businessImage + "' /><span>" + this.name + "</span></a></li>")
		}
		else {
			$('.yelp-results').append("<li><a href='" + this.url + "'><img src='" + this.fallbackImage + "' /><span>" + this.name + "</span></a></li>")
		}

	}
}

$(document).ready(function(){
	resultsView.onYelpSearch();
	resultsView.listenForMore();
});
