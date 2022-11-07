'use strict';

import { API_URL, IMG_PATH, SEARCH_URL } from './api.js';

const form = document.querySelector('#form');
const search = document.querySelector('#search');
const main = document.querySelector('#main');

// Get movies from TMDB
async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();

  showMovies(data.results);
}

// Handling search input
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchItem = search.value;

  if (searchItem && searchItem !== '') {
    getMovies(SEARCH_URL + searchItem);
    search.value = '';
  } else {
    window.location.reload();
  }
});

// display movies
function showMovies(movies) {
  main.innerHTML = '';

  movies
    .map(({ title, poster_path, vote_average, overview }) => {
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');

      movieEl.innerHTML = `
    <img
      src="${IMG_PATH + poster_path}"
      alt="${title}"
    />
    <div class="movie__info">
      <h3 class="movie__title">${title}</h3>
      <span class="${getRating(vote_average)}">${vote_average}</span>
    </div>
    <div class="movie__overview">
      <h3>Overview</h3>
      <p>
       ${overview}
      </p>
    </div>
    `;

      main.appendChild(movieEl);
    })
    .join('');
}

// get rating
function getRating(rate) {
  if (rate >= 8) {
    return 'green';
  } else if (rate >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

getMovies(API_URL);
