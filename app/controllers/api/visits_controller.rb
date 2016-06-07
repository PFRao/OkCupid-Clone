class Api::VisitsController < ApplicationController

  def index
    type = visit_params[:type]

    if type == "incoming"
      @visits = User.find(visit_params[:visitor_id]).incoming_visits
    else
      @visits = User.find(visit_params[:visitor_id]).outgoing_visits
    end

    render "api/visits/index"
  end

  def create
    @visit = Visit.new(visit_params)

    if @visit.save
      render "api/visits/show"
    else
      render json: @visit.errors, status: 412
    end
  end

  def destroy
    @visit = Visit.find_by(visit_params)

    if @visit
      @visit.destroy!
      render "api/visits/show"
    else
      render json: @visit.errors, status: 412
    end
  end

  private
  def visit_params
    params.require(:visit).permit(:visitor_id, :visitee_id, :type)
  end

end
