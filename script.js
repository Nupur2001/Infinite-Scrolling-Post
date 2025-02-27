document.addEventListener("DOMContentLoaded", () => {
  let search = document.querySelector(".search");
  let postContainer = document.querySelector(".postContainer");
  // let url = "https://jsonplaceholder.typicode.com/posts";

  let currentPage = 1;
  let numPost=5
  let postNumber=1
  let isFetching = false;
  let hasMore = true;

function firstLetterCapitalize(letter){
return letter.charAt(0).toUpperCase()+letter.splice(0)
}

  async function fetchData() {
    isFetching = true;
    let response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${numPost}&_page=${currentPage}`
    );

    let data = await response.json();
    console.log(data);
    isFetching = false;

    if (data.length === 0) {
      hasMore = false;
      return;
    }
    for (let postData of data) {
      let post = document.createElement("div");
      post.classList.add("post");

      let circle = document.createElement("span");
      circle.classList.add("circle");
      circle.textContent=postNumber
      postNumber++

      let postInfo = document.createElement("div");
      postInfo.classList.add("postInfo");

      let postTitle = document.createElement("h2");
      postTitle.classList.add("postTitle");
      postTitle.textContent = `${postData.title}`;

      let postDescription = document.createElement("p");
      postDescription.classList.add("postDescription");
      postDescription.textContent = `${postData.body}`;

      postContainer.appendChild(post);
      post.appendChild(postInfo);
      post.appendChild(circle)
      postInfo.appendChild(postTitle);
      postInfo.appendChild(postDescription);
    }
    currentPage++;
  }
  //   console.log(fetchData())
  fetchData();

  window.addEventListener("scroll", () => {
    if (isFetching || !hasMore) {
      return;
    }
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //   console.log("Touched Bottom");
    // fetchData();

    }
  });
});
