document.addEventListener("DOMContentLoaded", () => {
  let search = document.querySelector(".search");
  let postContainer = document.querySelector(".postContainer");

  // let url = "https://jsonplaceholder.typicode.com/posts";

  let currentPage = 1;
  let numPost = 5;
  let postNumber = 1;
  let isFetching = false;
  let hasMore = true;
  let isLoading = false;

  function firstLetterCapitalize(letter) {
    return letter.charAt(0).toUpperCase() + letter.slice(1);
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
      circle.textContent = postNumber;
      postNumber++;

      let postInfo = document.createElement("div");
      postInfo.classList.add("postInfo");

      let postTitle = document.createElement("h2");
      postTitle.classList.add("postTitle");
      postTitle.textContent = firstLetterCapitalize(`${postData.title}`);

      let postDescription = document.createElement("p");
      postDescription.classList.add("postDescription");
      postDescription.textContent = firstLetterCapitalize(`${postData.body}`);

      postContainer.appendChild(post);
      post.appendChild(postInfo);
      post.appendChild(circle);
      postInfo.appendChild(postTitle);
      postInfo.appendChild(postDescription);
    }
    currentPage++;
  }
  //   console.log(fetchData())
  fetchData();

  function loaderShowing() {
    let loading = document.querySelector(".loading");
    isLoading = true;
    loading.classList.add("show");
    setTimeout(() => {
      loading.classList.remove("show");
      setTimeout(() => {
        currentPage++;
        fetchData();
      }, 500);
      isLoading = false;
    }, 1000);
  }

  function filterData(e) {
    let enteredInput = e.target.value;
    enteredInput = enteredInput.charAt(0).toUpperCase() + enteredInput.slice(1);
  }

  search.addEventListener("input", filterData);

  window.addEventListener("scroll", () => {
    if (isFetching || !hasMore) {
      return;
    }
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 10
    ) {
      //   alert("Touched Bottom");
      loaderShowing();
        fetchData();
    }
  });
});
