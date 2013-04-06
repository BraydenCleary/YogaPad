// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function(){

	//Delete notes
	$(".notes").on('click', function(event){
		if ($(event.target).is("a[data-method='delete']")){
			event.stopPropagation();
			event.preventDefault();
			var url = $(event.target).attr('href');
			$(event.target).closest('li').hide();
			$.ajax({
				url: url,
				type: 'POST',
				data: { "_method":"delete"},
				success: function(response){
					console.log('Note deleted')
				}
			});
		}
	});

	//Render notes
	var notes = JSON.parse($('[data-notes]').text())
	for (i in notes){
		$('.notes').append("<li>" + notes[i].text + " " + notes[i].created_at + "</li>")
	}

});

