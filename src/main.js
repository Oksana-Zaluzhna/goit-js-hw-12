import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './js/pixabay-api.js';
import { createMarkup, showErrorMsg } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="query"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.load-more');

form.addEventListener('submit', onSearch);
loadMore.addEventListener('click', onLoadMore);

loadMore.style.display = 'none';
loader.style.display = 'none';
const perPage = 15;
let page = 1;
let query = '';
let simpleLightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

async function onSearch(event) {
  event.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  loader.style.display = 'block';
  loadMore.style.display = 'none';

  query = input.value.trim();
  if (!query) {
    showErrorMsg('Please enter a search query!');

    loadMore.style.display = 'none';
    loader.style.display = 'none';
    return;
  }

  try {
    const data = await getImages(query, page, perPage);
    if (!data.hits.length) {
      showErrorMsg(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      loader.style.display = 'none';
      return;
    }

    if (data.hits.length < 15) {
      loadMore.style.display = 'none';
    } else {
      loadMore.style.display = 'block';
    }

    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    simpleLightbox.refresh();
  } catch (error) {
    showErrorMsg('Sorry, but something went wrong!');
  } finally {
    loader.style.display = 'none';
    form.reset();
  }
}

async function onLoadMore() {
  page += 1;

  try {
    loadMore.style.display = 'none';
    loader.style.display = 'block';

    const data = await getImages(query, page, perPage);
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    simpleLightbox.refresh();

    const galleryCard = document.querySelector('.gallery-item');
    if (galleryCard) {
      const cardSize = galleryCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardSize * 2,
        left: 0,
        behavior: 'smooth',
      });
    }

    if (data.totalHits <= Math.ceil(page * perPage)) {
      loadMore.style.display = 'none';
      showErrorMsg(
        `We're sorry, but you've reached the end of search results.`
      );
    } else {
      loadMore.style.display = 'block';
    }
  } catch (error) {
    showErrorMsg('Sorry, but something went wrong!');
  } finally {
    loader.style.display = 'none';
  }
}
