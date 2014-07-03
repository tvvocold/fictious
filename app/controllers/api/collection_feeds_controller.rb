class Api::CollectionFeedsController < ApplicationController
  def index
    @collection_feeds = CollectionFeed.all
    respond_to do |format|
      format.json
    end
  end

  def create
    @collection = Collection.find(params[:collection_feed][:collection_id])
    @post = Post.find(params[:collection_feed][:post_id])
    @collection_feed = CollectionFeed.new(
                                      collection_id: @collection.id,
                                      post_id: @post.id
                                      )
    if @collection_feed.save
      render :json => @collection_feed
    else
      flash.now[:errors] = @collection_feed.errors.full_messages
    end
  end

  def destroy

  end
end
