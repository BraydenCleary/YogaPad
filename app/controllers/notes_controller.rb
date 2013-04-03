class NotesController < ApplicationController
  respond_to :js

  def index
    @note  = Note.new
    @notes = Note.all
  end

  def create
    @note = Note.new(params[:note])
    if @note.save
      respond_with @note
    else
      render :index
    end
  end

  def destroy
    note = Note.find(params[:id])
    if note
      note.destroy
      render :json => { status: 'ok' }
    else
      render :json => { status: 'error'}
    end
  end

end
