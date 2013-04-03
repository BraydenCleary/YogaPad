// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function(){

	$(".notes").on('click', function(event){
		if ($(event.target).is("a[data-method='delete']")){
			event.stopPropagation();
			event.preventDefault();
			debugger
			var url = $(event.target).attr('href');
			$(event.target).closest('li').hide();
			$.ajax({
				url: url,
				type: 'POST',
				data: { "_method":"delete"},
				success: function(response){
					debugger
					console.log('Note deleted')
				}
			});
		}
	});
});

