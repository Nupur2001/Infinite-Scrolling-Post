document.addEventListener("DOMContentLoaded", () => {
  let search = document.querySelector(".search");
  let postContainer = document.querySelector(".postContainer");

  let currentPage = 1;
  let numPost = 5;
  let postNumber = 1;
  let isFetching = false;
  let hasMore = true;

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
      circle.textContent = postNumber++;

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
  let isLoading = false;

  function loaderShowing() {
    let loading = document.querySelector(".loading");
    isLoading = true;
    loading.classList.add("show");
    setTimeout(() => {
      loading.classList.remove("show");
      setTimeout(() => {
        currentPage++;
        // fetchData();
      }, 500);
      isLoading = false;
    }, 1000);
  }

  function filterData(e) {
    let found = false;
    let enteredInput =
      //   e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      e.target.value.toUpperCase();
    let allPosts = document.querySelectorAll(".post");
    allPosts.forEach((post) => {
      let postTitle = post.querySelector(".postTitle").innerText.toUpperCase();

      let postDescription = post
        .querySelector(".postDescription")
        .innerText.toUpperCase();
      if (
        postTitle.includes(enteredInput) ||
        postDescription.includes(enteredInput)
      ) {
        found = true;
        post.style.display = "flex";
      } else {
        post.style.display = "none";
      }
      if (!found) {
        postContainer.innerHTML = `<h2>No post found!!</h2>`;
      }
    });
    // console.log(enteredInput)
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
