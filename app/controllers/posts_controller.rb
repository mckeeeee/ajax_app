class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end

  def create
    # メモ作成時に未読の情報を保存する
    # falseは、checkedカラムの値がnullまたは0（つまり未読）ならfalseに該当)
    post = Post.create(content: params[:content], checked: false)
    # Ajaxを実現するためレスポンスをJSONに変更
    render json:{ post: post }
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
