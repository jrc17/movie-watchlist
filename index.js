const API = "b00dbda9";

const movieForm = document.getElementById("movie-form");
const movieInput = document.getElementById("movie-input");
const searchResult = document.getElementById("search-result");
const noSearch = document.getElementById("no-search");
//

document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    const movieId = e.target.dataset.id;
    const movieDiv = document.getElementById(e.target.dataset.id);

    const watchlistObj = {
      poster: `${document.getElementById(`poster-${movieId}`).src}`,
      title: `${document.getElementById(`title-${movieId}`).textContent}`,
      rating: `${document.getElementById(`rating-${movieId}`).textContent}`,
      runtime: `${document.getElementById(`runtime-${movieId}`).textContent}`,
      genre: `${document.getElementById(`genre-${movieId}`).textContent}`,
      plot: `${document.getElementById(`plot-${movieId}`).textContent}`,
      id: `${movieId}`,
    };

    localStorage.setItem(`${movieId}`, JSON.stringify(watchlistObj));
  }
});

movieForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (movieInput.value) {
    searchMovie(movieInput.value);
    noSearch.classList.add("hidden");
  }
});
async function searchMovie(title) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${API}&s=${title}`);
  const data = await res.json();

  if (data.Response == "True") {
    getMovieInfo(data.Search);
  } else {
    noSearch.classList.remove("hidden");
    noSearch.innerHTML =
      "<p>Unable to find what you’re looking for. Please try another search.</p>";
    searchResult.innerHTML = "";
  }
}

function getMovieInfo(movies) {
  searchResult.innerHTML = "";
  movies.forEach(async (movie) => {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API}&t=${movie.Title}`
    );
    const data = await res.json();

    searchResult.innerHTML += `
    <div class="movie" id="${data.imdbID}">
    <img src="${data.Poster}" id="poster-${data.imdbID}">
        <div>
            <div class="movie-title">
                <h2 id="title-${data.imdbID}">${data.Title}</h2>
                <div class="rating">
                <img src="img/starIcon.png">
                <p id="rating-${data.imdbID}">${data.imdbRating}</p>
                </div>
            </div>
            <div class="movie-info">
                <p id="runtime-${data.imdbID}">${data.Runtime}</p>
                <p id="genre-${data.imdbID}">${data.Genre}</p>
                <button data-id="${data.imdbID}"><i class="fa-solid fa-plus icon-btn"></i>Watchlist</button>
            </div>
        <p id="plot-${data.imdbID}" class="plot">${data.Plot}</p>
        </div>
    </div>
    `;
  });
}
