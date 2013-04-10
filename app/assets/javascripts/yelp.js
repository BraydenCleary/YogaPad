var resultsView = {
	init: function(results){
		this.element = $('.yelp-results');
		this.onYelpSearch();
		this.listenForMore();
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
			this.element.append("<span class='more'>MORE</span>")
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

	onYelpSearch: function(){
		$('.yelp-search').on('submit', function(event){
			resultsNotices.displaySearchStatusNotice();
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
				resultsNotices.invalidSearchNotice();
			}
		});
	},

	validSearch: function(response){
		resultsNotices.validSearchNotice();
		$('.yelp-search').find("input[name='zipcode']").val(''); //clear search box
		var search_results = response.businesses
		this.element.empty();
		this.results = this.prepResults(search_results)
		this.renderResults();
	},

	prepResults: function(results){
		return this.splitResults(results, 3)
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

resultsNotices = {
	init: function(){
		this.element = $('.yelp-notices')
		this.errorTemplate = this.element.find('.yelp-error').remove();
		this.searchStatusTemplate = this.element.find('.yelp-search-status').remove();
		this.successTemplate = this.element.find('.yelp-success').remove();
	},

	generateErrorNotice: function(notice){
		return this.errorTemplate.clone().text(notice);
	},

	invalidSearchNotice: function(){
		this.element.html(this.generateErrorNotice('Invalid Zipcode'));
	},

	validSearchNotice: function(){
		this.element.html(this.successTemplate);
	},

	generateStatusNotice: function(notice){
		return this.searchStatusTemplate.clone().text(notice);
	},

	displaySearchStatusNotice: function(){
		this.element.html(this.generateStatusNotice('Searching...'));
	}
}


$(document).ready(function(){
	resultsView.init([]);
	resultsNotices.init();
});
