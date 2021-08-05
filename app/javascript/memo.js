// memo.jsに関数を定義し、ページを読み込んだときに実行されるようにする
function memo() {
  // index.html.erbの4行目 <%= form.submit '投稿する' , id: "submit" %>に
  // id があるのでgetElementByIdを用いて「投稿する」ボタンの情報を取得
  const submit = document.getElementById("submit");

  // addEventListenerを使用して、「投稿する」ボタンをclickした場合に実行される関数を定義
  // ("click", (e)の 『e』は、とりあえず定義している認識で
  submit.addEventListener("click", (e) => {

    // FormDataは、フォームに入力された値を取得できるオブジェクト
    // new FormData(フォームの要素);のように、引数にフォームの要素を渡すことで、
    // そのフォームに入力された値を取得できる
    const formData = new FormData(document.getElementById("form"));

    // Ajaxに必要なオブジェクトを生成している
    const XHR = new XMLHttpRequest();

    // openでリクエストを初期化する
    // openはどのようなリクエストをするのか指定するメソッド
    // HTTPメソッドはPOST、パスは /posts 、⾮同期通信はtrue
    XHR.open("POST", "/posts", true);

    // レスポンスのタイプを指定する
    XHR.responseType = "json";

    // FormDataとは、フォームに入力された値を取得できるオブジェクトのこと
    // 今回は、メモ投稿のフォームに入力された情報を非同期通信で送信する必要があるため使用
    // FormDataとsendを使用して、メモ投稿のフォームに入力された情報をposts_controllerに送信
    XHR.send(formData);

    // コントローラーからレスポンスを受け取った時の処理を記述する
    // onloadはレスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
    XHR.onload = () => {
      if (XHR.status != 200) {
        // レスポンスのHTTPステータスを解析し、該当するエラーメッセージを表示するようにしている
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // 処理を終了している
        return null;
      }

      // itemはレスポンスとして返却されたメモのレコードデータを取得しています
       // XHR.response.post;のpostは、
        // posts_controller 12行目 render json: { post: item }のpostを指している
      const item = XHR.response.post;

      // listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得している
      const list = document.getElementById("list");

      // formTextを取得する理由は、メモの入力フォームをリセットするため
      // この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、リセットする必要がある
      // ここではリセット対象の要素であるcontentを取得している
      const formText = document.getElementById("content");

      // メモとして描画する部分のHTMLを定義している
      // HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画される
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時:${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;

      // Listという要素に対して、insertAdjacentHTMLでHTMLを追加します
      // 第一引数にafterendを指定することで、要素Listの直後に挿入できる
      list.insertAdjacentHTML("afterend", HTML);

      // このコードにより、「メモの入力フォームに入力されたままの文字」はリセットされる。
      // 正確には、空の文字列に上書きされる仕組み
      formText.value = "";
    };
    // preventDefault();で標準設定されているイベントを阻止する
    // e.preventDefault(); この記述がないと正常に作動しない
    e.preventDefault();
  });
}
// window.addEventListener("load", memo);で
// window（ページ）を読み込んだ時にmemoが実行されるようにする
window.addEventListener("load", memo);