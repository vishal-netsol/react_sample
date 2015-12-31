class BlogsController < ApplicationController
respond_to :json

  def index
    offset = params[:page].to_i * 10
    respond_with Blog.all.limit(10).offset(offset)
  end

  def create
    respond_with Blog.create(blog_params)
  end

  private

  def comment_params
    params.require(:blog).permit(:author, :content)
  end
end
