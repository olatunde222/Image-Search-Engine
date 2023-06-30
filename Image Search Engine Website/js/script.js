// Access Key from unspalsh
const accessKey = "qybDl_xG0wKaVHuUtgA0GFN8GCCDzJkEP_clY_bFJmY";

// Assigning variables to the ID's
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1; // default page

// Creating a fucntion to fetch data from the Unsplash API
async function searchImages() {
  keyword = searchBox.value; //user input been the keyword

  // Link + page + keyword + accesKey = url
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=${12}`;

  // Fetching data from Api
  const response = await fetch(url);
  const data = await response.json(); // returns a json file

  //  Rendering a new page for new search
  if (page === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const image = document.createElement("img"); // creating a new img tag<img>
    image.src = result.urls.small;
    const imageLink = document.createElement("a"); // creating a anchor tag <a>
    imageLink.href = result.links.html;
    imageLink.target = "_blank"; //Opens the linked document in a new window or tab

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
  showMoreBtn.style.display = "block"; // Displaying the hidden Show More button in the CSS
}

// Adding a Click Event Listner when the search form button is been triggered
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

// Triggering the show more button
showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
