class CollectionFeedsController < ApplicationController
  def create
    @collection = Collection.find(params[:collection_feed][:collection_id])
    @post = Post.find(params[:collection_feed][:post_id])
    @collection_feed = CollectionFeed.new(
                                      collection_id: @collection.id,
                                      post_id: @post.id
                                      )
    if @collection_feed.save
      redirect_to :back
    else
      flash.now[:errors] = @collection_feed.errors.full_messages
      redirect_to :back
    end
  end

  def destroy

  end
end
