function check() {
  // 表示されているすべてのメモを取得している
  // (".post")は、index.html.erbの12行目 div class="post"を指している
  const posts = document.querySelectorAll(".post");

  // ↑で複数取得した(".post")という要素に,forEachで繰り返し処理を行い、
  // 要素一つ一つに既読処理を行う
  posts.forEach(function (post) { 
    // イベント発火（メモをクリック）が起きている要素にdata-load = "data-load" = "true"はまだ追加されていないため、
    // if文の処理は読み込まれず、post.setAttribute("data-load", "true");に処理が移る
    if (post.getAttribute("data-load") != null) {

      // イベント発火が起きている要素にdata-load = "true"が追加されているため、
      // post.getAttribute("data-load") != null)の条件に当てはまり、if文の処理が読み込まれる。
      // その結果、返り値としてreturn null; がかえってきて、処理が止まる流れになる
      return null;
    }
    // 新たに要素にdata-load = "true"と属性を追加している
    post.setAttribute("data-load", "true");
    

    // メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => {

      // どのメモをクリックしたのか、カスタムデータを利用して取得している
      // post.getAttribute("data-id")は、
      // index.html.erbの8行目 data-id = <%= post.id %>の data-id のこと
      const postId = post.getAttribute("data-id");

      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();

      // openでリクエストを初期化する
      // openはどのようなリクエストをするのか指定するメソッド
      XHR.open("GET", `/posts/${postId}`, true);
      
      // レスポンスのタイプを指定する
      XHR.responseType = "json";

      // sendでリクエストを送信する
      XHR.send();

      
      // コントローラーからレスポンスを受け取った時の処理を記述する
      // onloadはレスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
      XHR.onload = () => {
        if (XHR.status != 200) {
          // レスポンスのHTTPステータスを解析し、該当するエラーメッセージを表示するようにしている
          alert('Error ${XHR.status}: ${XHR.statusText}');
          // 処理を終了している
          return null;
        }
        
        // レスポンスされたデータを変数itemに代入している
        // XHR.response.post;のpostは、
        // posts_controller 26行目 render json: { post: item }のpostを指している
        const item = XHR.response.post;
        // trueは既読状態
                if (item.checked === true){
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          // post.cssの11行目 div[data-check = "true"と連動
          post.setAttribute("data-check", "true");

          // falseは未読状態
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);
// window.addEventListener("load", check);