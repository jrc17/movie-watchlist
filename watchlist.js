const watchlist = document.getElementById("watchlist");
const emptyWatchlist = document.getElementById("empty-watchlist");
function renderList() {
  let listHTML = "";
  if (localStorage.length) {
    emptyWatchlist.classList.add("hidden");
    for (var i = 0; i < localStorage.length; i++) {
      const { genre, id, plot, poster, rating, runtime, title } = JSON.parse(
        localStorage.getItem(localStorage.key(i))
      );

      listHTML += `
  <div class="movie" id="watchlist-${id}" >
  <img src="${poster}">
      <div>
          <div class="movie-title">
              <h2 >${title}</h2>
               <div class="rating">
               <img src="img/starIcon.png">
              <p >${rating}</p>
               </div>
          </div>
          <div class="movie-info">
              <p >${runtime}</p>
              <p >${genre}</p>
              <button data-id="${id}"><i class="fa-solid fa-minus icon-btn"></i>Remove</button>
          </div>
      <p >${plot}</p>
      </div>
  </div>
  `;
    }
  } else {
    emptyWatchlist.classList.remove("hidden");
  }
  watchlist.innerHTML = listHTML;
}
document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    localStorage.removeItem(`${e.target.dataset.id}`);
    renderList();
  }
});
renderList();
