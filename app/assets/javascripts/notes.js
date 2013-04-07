// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
notesView = {
  setNotes: function(){
    this.notes = JSON.parse($('[data-notes]').text())
  },

  init: function(){
    this.template = $('.notes').children();
    this.setNotes();
    this.listenForDelete();
    $('.notes').html('')
  },

  renderNotes: function(){
    for (i in this.notes){
      note = new noteView(this.notes[i], this.template.clone())
      note.render2();
      $('.notes').append(note.template)
    }
  },

  listenForDelete: function(){
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
  }
}


function noteView(note, template) {
  this.id = note.id;
  this.text = note.text;
  this.created_at = new Date(note.created_at).toDateString();
  this.template = $(template);

  this.setBody = function(){
    this.template.find('.note-body').text(this.text);
  }

  this.setHref = function(){
    this.template.find('a').attr('href', '/notes/' + this.id);
  }

  this.setDate = function(){
    this.template.find('.note-date').text(this.created_at);
  }

  this.render2 = function(){
    this.setBody();
    this.setHref();
    this.setDate();
    return (this.template);
  }
}


$(document).ready(function(){
  notesView.init();
  notesView.renderNotes();
});

