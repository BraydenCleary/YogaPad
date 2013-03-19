class NotesController < ApplicationController

  def index
    @note  = Note.new
    @notes = Note.all 
  end

  def create
    note = Note.new(params[:note])
    if note.save
      flash[:success] = 'Note successfully created!'
      redirect_to notes_path
    else
      render 'index'
    end
  end
  
end
