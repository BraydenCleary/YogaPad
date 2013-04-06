$(document).ready(function(){

	$('#signup-toggle').on('click', function(){
		$('#signup-form').slideToggle();
	});

	$('#signup-trigger').on('click', function(){
		$('#signup-form').slideToggle();
	});

	$('#signin-toggle').on('click', function(){
		$('#signin-form').slideToggle();
	})

	$('#yelp').on('click', function(){
		$('.yelp-search').slideToggle();
	})

});
