// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
notesView = {
  init: function(){
    this.template = $('.notes').children();
    this.setNotes();
    this.hideNotices();
    this.listenForDelete();
    this.listenForCreate();

    $('.notes').html('')
  },

  setNotes: function(){
    this.notes = JSON.parse($('[data-notes]').text())
  },

  hideNotices: function(){
    $('.notices').children().css('visibility', 'hidden')
  },

  stopFadingOut: function(target){
    $(target).stop(true,true);
  },

  showNotice: function(notice){
    notesView.stopFadingOut('.note-action')
    $('.note-action').css('visibility', 'visible').css('opacity',1).text(notice).fadeTo(2000,0,function(){})
  },

  listenForDelete: function(){
    $(".notes").on('click', function(event){
      notesView.deleteNote(event);
    });
  },

  deleteNote: function(event){
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
          notesView.showNotice('Note successfully deleted.');
        }
      });
    }
  },

  listenForCreate: function(){
    $('.new_note').on('submit', function(event){
      notesView.createNote(event)
    });
  },

  createNote: function(event){
    event.stopPropagation();
    event.preventDefault();
    $.ajax({
      url: $(event.target).attr('action'),
      type: $(event.target).attr('method'),
      data: $(event.target).serialize(),
      success: function(response){
        notesView.renderNote(response, notesView.template.clone())
        $('.new_note').find("textarea").val('')
        notesView.showNotice('Note successfully created.');
      }
    });
  },

  renderNote: function(note, template){
    var note = new noteView(note, template)
    note.render();
    $('.notes').append(note.template)
  },

  renderNotes: function(){
    for (i in this.notes){
      this.renderNote(this.notes[i], this.template.clone());
    }
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

  this.render = function(){
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

