// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function noteView(note) {
	this.id = note.id
	this.text = note.text
	this.created_at = new Date(note.created_at).toDateString()
	this.delete_button = "<a href='/notes/" + this.id + "' " + "class='likeabutton' data-method='delete' rel='nofollow'>Remove</a></li>"

	this.render = function() {
		return ("<li>" + this.text + " " + this.created_at + this.delete_button + "</li>")
	}
}


$(document).ready(function(){

	//Delete notes
	//should be inside of notes new
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
	//should be inside of notes view
	var notes = JSON.parse($('[data-notes]').text())
	for (i in notes){
		note = new noteView(notes[i])
		$('.notes').append(note.render())
	}

});

