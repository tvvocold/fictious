class GroupsController < ApplicationController
  def index
    @owned_groups = current_user.owned_groups
    @groups = current_user.joined_groups
  end

  def new

  end

  def create
    @group = current_user.owned_groups.create(group_params)
    if @group.save
      current_user.group_users.create(group_id: @group.id)
      redirect_to @group
    else
      flash.now[:errors] = @group.errors.full_messages
      render :new
    end
  end

  def edit
  end

  def update
  end

  def destroy
    @group = Group.find(params[:id])
    @group.destroy()
  end

  def show
    @group = Group.find(params[:id])
    @writers = @group.writers
    @pending_writers = @group.pending_writers
  end

  private

  def group_params
    params.require(:group).permit(:name)
  end
end
