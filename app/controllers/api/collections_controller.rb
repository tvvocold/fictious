class Api::CollectionsController < ApplicationController
  def index
    @collections = Collection.all
    respond_to do |format|
      format.json
    end
  end

  def new
    @collection = Collection.new()
  end

  def search
    @results = Collection.search_title(collection_params[:query])
    render :json => @results
  end

  def create
    @collection = Collection.new(collection_params)
    @collection.owner_id = current_user.id

    if @collection.save
      render :json => @collection
    else
      flash.now[:errors] = @collection.errors.full_messages
      render :json => @collection
    end
  end

  def edit
    @collection = Collection.find(params[:id])
  end

  def update
    @collection = Collection.find(params[:id])
    if @collection.update_attributes(collection_params)
      render :json => @collection
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
    respond_to do |format|
      format.json
    end
  end

  private

  def collection_params
    params.require(:collection).permit(:title, :owner_id, :collection_photo, :query)
  end
end
