// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
notesView = {
  init: function(){
    this.element = $('.notes');
    this.noteViewTemplate = this.element.find('.note').remove();
    this.setNotes();
    this.hideNotices();
    this.listenForDelete();
    this.listenForCreate();
  },

  setNotes: function(){
    this.notes = JSON.parse($('[data-notes]').text())
  },

  hideNotices: function(){
    $('.notices').children().css('visibility', 'hidden') //notices should have it's own view
  },

  stopFadingOut: function(target){
    $(target).stop(true,true);
  },

  showNotice: function(notice){
    notesView.stopFadingOut('.note-action')
    $('.note-action').css('visibility', 'visible').css('opacity',1).text(notice).fadeTo(2000,0,function(){})
  },

  listenForDelete: function(){
    this.element.on('click', function(event){
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
    $('.new_note').on('submit', function(event){ //newNote view (should be it's own view) // don't use underscores in class names
      notesView.createNote(event)
    });
  },

  createNote: function(event){  //this would be part of the above view
    event.stopPropagation();
    event.preventDefault();
    $.ajax({
      url: $(event.target).attr('action'),
      type: $(event.target).attr('method'),
      data: $(event.target).serialize(),
      success: function(response){
        notesView.renderNote(response, notesView.noteViewTemplate)
        $('.new_note').find("textarea").val('')
        notesView.showNotice('Note successfully created.');
      }
    });
  },

  renderNote: function(note, template){ //rename this to addnote
    var note = new noteView(note, template)
    this.element.append(note.render())
  },

  renderNotes: function(){
    for (i in this.notes){
      this.renderNote(this.notes[i], this.noteViewTemplate);
    }
  }
}

function noteView(note, template) {
  this.id = note.id;
  this.text = note.text;
  this.created_at = new Date(note.created_at).toDateString();
  this.element = $(template).clone();

  this.setBody = function(){
    this.element.find('.note-body').text(this.text);
  }

  this.setHref = function(){
    this.element.find('a').attr('href', '/notes/' + this.id);
  }

  this.setDate = function(){
    this.element.find('.note-date').text(this.created_at);
  }

  this.render = function(){
    this.setBody();
    this.setHref();
    this.setDate();
    return this.element;
  }
}

$(document).ready(function(){
  notesView.init();
  notesView.renderNotes();
});

