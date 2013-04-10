// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
notesView = {
  init: function(notes){
    this.element = $('.notes');
    this.noteViewTemplate = this.element.find('.note').remove();
    this.notes = notes
    this.listenForDelete();
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
          noticesView.displaySuccessNotice('Note successfully deleted.');
        }
      });
    }
  },

  addNote: function(note, template){
    var note = new noteView(note, template)
    this.element.append(note.render())
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

noticesView = {
  init: function(){
    this.element = $('.notices');
    this.noticesViewTemplate = $(this.element).find('.action').remove();
  },

  generateNotice: function(notice, css_class){
    notice = new noticeView(notice, this.noticesViewTemplate, css_class);
    this.element.html(notice.notice);
  },

  displaySuccessNotice: function(notice){
    this.generateNotice(notice, 'success');
    this.fadeNotice();
  },

  displayErrorNotice: function(notice){
    this.generateNotice(notice, 'error');
    this.fadeNotice();
  },

  fadeNotice: function(){
    this.element.find('.action').fadeTo(2000, 0);
  }
}

function noticeView(notice, template, css_class){
  this.element = $(template).clone();
  this.css_class  = css_class
  this.notice  = this.element.text(notice).addClass(this.css_class);
}

notesNewView = {
  init: function(){
    this.element = $('.new_note')
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
        noticesView.displaySuccessNotice('Note successfully created.');
      },
      error: function(request, textStatus, errorThrown){
        noticesView.displayErrorNotice(request.responseText)
      }
    });
    notesNewView.clearInput();
  },

  clearInput: function(){
    this.element.find("textarea").val('');
  },

}


$(document).ready(function(){
  var notes = JSON.parse($('[data-notes]').text())
  notesView.init(notes);
  notesView.renderNotes();

  noticesView.init();

  notesNewView.init();
});

