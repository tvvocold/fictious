class Api::CollectionsController < ApplicationController
  def index
    @collections = current_user.collections
    respond_to do |format|
      format.json
    end
  end

  def new
    @collection = Collection.new()
  end

  def create
    @collection = Collection.new(collection_params)
    @collection.owner_id = current_user.id

    if @collection.save
      redirect_to collection_url(@collection)
    else
      flash.now[:errors] = @collection.errors.full_messages
      render :new
    end
  end

  def edit
    @collection = Collection.find(params[:id])
  end

  def update
    @collection = Collection.find(params[:id])
    if @collection.update_attributes(collection_params)
      redirect_to collection_url(@collection)
    else
      flash.now[:errors] = @collection.errors.full_messages
      render :edit
    end
  end

  def destroy
    @collection = Collection.find(params[:id])
    @collection.destroy()
    redirect_to user_collections_url(current_user.id)
  end

  def show
    @posts = current_user.posts
    @collection = Collection.find(params[:id])
    @collection_posts = @collection.posts
    @subscription = Subscription.find_by(collection_id: params[:id],
                                         subscriber_id: current_user.id
                                         )
  end

  private

  def collection_params
    params.require(:collection).permit(:title, :owner_id, :collection_photo)
  end
end
