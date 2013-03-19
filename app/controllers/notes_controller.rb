class NotesController < ApplicationController

  def index
    @note  = Note.new
    @notes = Note.all 
  end
  
end
