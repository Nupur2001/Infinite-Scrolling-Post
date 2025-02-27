document.addEventListener("DOMContentLoaded", () => {
  let search = document.querySelector(".search");
  let postContainer = document.querySelector(".postContainer");
  // let url = "https://jsonplaceholder.typicode.com/posts";

  let currentPage = 1;
  let isFetching = false;
  let hasMore = true;

  async function fetchData() {
    isFetching = true;
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}`
    );

    let data = await response.json;
    console.log(data);
    isFetching = false;

    if (data.length === 0) {
      hasMore = false;
      return;
    }
    for (let post of data) {
      let post = document.createElement("div");
      post.classList.add("post");

      let circle = document.createElement("span");
      circle.classList.add("circle");

      let postInfo = document.createElement("div");
      postInfo.classList.add("postInfo");

      let postTitle = document.createElement("h2");
      postTitle.classList.add("postTitle");
      postTitle = `${post.title}`;
      
      let postDescription = document.createElement("p");
      postDescription.classList.add("postDescription");
      postDescription = `${post.body}`;

      post.appendChild(postInfo);
      postInfo.innerHTML = `
        // ${postTitle}
        // ${postDescription}

        `;

      postContainer.appendChild(post);
    }
  }
  //   console.log(fetchData())
  fetchData();
});
