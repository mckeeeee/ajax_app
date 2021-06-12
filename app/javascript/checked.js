function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) { 
    post.addEventListener("click", () => {});
  });
}
window.addEventListener("load", check);