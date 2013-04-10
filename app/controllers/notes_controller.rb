class NotesController < ApplicationController

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
      respond_to do |format|
        format.js { render :text => @note.errors.full_messages.first, :status => 403}
      end
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
