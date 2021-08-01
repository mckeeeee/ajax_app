class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])
    if post.checked
      # checked: falseは、checkedカラムの値がnullまたは0（つまり未読）ならfalseに該当
      post.update(checked: false)
    else
      # checked: trueは、checkedカラムの値が1なら（つまり既読）trueに該当
      post.update(checked: true)
    end

    item = Post.find(params[:id])
    render json: { post: item }
  end
end
