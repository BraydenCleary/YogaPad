class NotesController < ApplicationController
  respond_to :js

  def index
    @note  = Note.new
    @notes = Note.all 
  end

  def create
    @note = Note.new(params[:note])
    if @note.save
      flash[:success] = 'Note successfully created!'
      respond_with @note
    else
      render 'index'
    end
  end
  
end
