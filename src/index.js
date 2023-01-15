import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createImageList } from './js/markup';
import { fetchImages } from './js/fetchImages';

let lightBox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const input = document.querySelector('.search-form_input');
const btnSearch = document.querySelector('.search-form_btn');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more_btn');
let pageNumber = 1;

btnLoadMore.style.display = 'none';

btnSearch.addEventListener('click', e => {
  e.preventDefault();
  cleanGallery();
  const trimmedValue = input.value.trim();
  if (trimmedValue !== '') {
    fetchImages(trimmedValue, pageNumber).then(foundData => {
      if (foundData.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        createImageList(foundData.hits);
        Notiflix.Notify.success(
          `Hooray! We found ${foundData.totalHits} images.`
        );
        setTimeout(() => {
          btnLoadMore.style.display = 'block';
        }, 200);
        lightBox.refresh();
      }
    });
  }
});

btnLoadMore.addEventListener('click', () => {
  pageNumber += 1;
  const trimmedValue = input.value.trim();
  btnLoadMore.style.display = 'none';
  fetchImages(trimmedValue, pageNumber).then(foundData => {
    if (foundData.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      createImageList(foundData.hits);
      Notiflix.Notify.success(
        `Hooray! We found ${foundData.totalHits} images.`
      );
      lightBox.refresh();
      btnLoadMore.style.display = 'block';
    }
  });
});

function cleanGallery() {
  gallery.innerHTML = '';
  pageNumber = 1;
  btnLoadMore.style.display = 'none';
}
