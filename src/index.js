import './styles.css';

import fetchWeather from './js/fetchWeather';
import weatherShowTemplate from './templates/markupTemplate.hbs';
import getGeoPosition from './js/getGeoPosition';
import spinner from './js/spinner';

const refs = {
  searchForm: document.querySelector('#search-form'),
  weatherSection: document.querySelector('#weather'),
};

// Ссылку на иконку в ответе от Apixu API необходимо дополнить протоколом `https:`

getGeoPosition().then(data => {
  const query = `${data.coords.latitude},${data.coords.longitude}`;

  spinner.show();
  fetchWeather(query)
    .then(data => {
      spinner.hide();
      insertWeatherMarkup(data);
    })
    .catch(error => console.warn(error));
});

refs.searchForm.addEventListener('submit', searchSubmitHandler);

function searchSubmitHandler(e) {
  e.preventDefault();

  const input = e.currentTarget.elements.city;
  clearResult();

  spinner.show();
  fetchWeather(input.value)
    .then(data => {
      spinner.hide();
      insertWeatherMarkup(data);
    })
    .catch(error => console.warn(error));

  input.value = '';
}

function insertWeatherMarkup(item) {
  const markup = weatherShowTemplate(item);
  refs.weatherSection.insertAdjacentHTML('beforeend', markup);
  refs.weatherSection.classList.remove('is-hidden');
}

function clearResult() {
  refs.weatherSection.innerHTML = '';
}
