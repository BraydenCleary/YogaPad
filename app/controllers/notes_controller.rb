class NotesController < ApplicationController
  respond_to :js

  def index
    @results ||= ''
    @note  = Note.new
    @notes = Note.all.map { |note| note.attributes }
  end

  def create
    @note = Note.new(params[:note])
    if @note.save
      render :json => @note.to_json
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
