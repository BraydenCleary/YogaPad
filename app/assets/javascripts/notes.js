// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
notesView = {
  init: function(){
    this.element = $('.notes');
    this.noteViewTemplate = this.element.find('.note').remove();
    this.setNotes();
    this.listenForDelete();
  },

  setNotes: function(){
    this.notes = JSON.parse($('[data-notes]').text())
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
          notesNoticesView.displayNotice('Note successfully deleted.');
        }
      });
    }
  },

  clearInput: function(){
    $('.new_note').find("textarea").val('');
  },

  addNote: function(note, template){
    var note = new noteView(note, template)
    this.element.append(note.render())
    this.clearInput();
  },

  renderNotes: function(){
    for (i in this.notes){
      this.addNote(this.notes[i], this.noteViewTemplate);
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

notesNoticesView = {
  init: function(){
    this.element = $('.notices')
    this.noticesViewTemplate = $(this.element).find('.note-action').remove()
  },

  generateNotice: function(notice){
    notice = new noticeView(notice, this.noticesViewTemplate)
    this.element.html(notice.notice)
  },

  displayNotice: function(notice){
    this.generateNotice(notice)
    this.fadeNotice();
  },

  fadeNotice: function(){
    this.element.find('.note-action').fadeTo(2000, 0)
  }
}

function noticeView(notice, template){
  this.element = $(template).clone();
  this.notice  = this.element.text(notice)
}

notesNewView = {

  init: function(){
    this.listenForCreate();
  },

  listenForCreate: function(){
    $('.new_note').on('submit', function(event){
      notesNewView.createNote(event);
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
        notesView.addNote(response, notesView.noteViewTemplate);
        notesNoticesView.displayNotice('Note successfully created.');
      }
    });
  }
}


$(document).ready(function(){
  notesView.init();
  notesView.renderNotes();

  notesNoticesView.init();

  notesNewView.init();
});

