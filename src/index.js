import './styles.css';

import fetchWeather from './js/fetchWeather';
import weatherShowTemplate from './templates/markupTemplate.hbs';
import getGeoPosition from './js/getGeoPosition';

const refs = {
  searchForm: document.querySelector('#search-form'),
  weatherSection: document.querySelector('#weather'),
};

// Прибрати табличку з error (location.json is not a function)
// Ссылку на иконку в ответе от Apixu API необходимо дополнить протоколом `https:`

getGeoPosition().then(data => {
  const query = `${data.coords.latitude},${data.coords.longitude}`;
  fetchWeather(query).then(data => {
    const markup = buildWeatherMarkup(data);
    insertWeatherMarkup(markup);
  });
});

refs.searchForm.addEventListener('submit', searchSubmitHandler);

function searchSubmitHandler(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.elements.city.value;
  clearResult();

  fetchWeather(inputValue).then(data => {
    const markup = buildWeatherMarkup(data);
    insertWeatherMarkup(markup);
  });
}

function buildWeatherMarkup(item) {
  return weatherShowTemplate(item);
}

function insertWeatherMarkup(item) {
  refs.weatherSection.insertAdjacentHTML('beforeend', item);
  refs.weatherSection.classList.remove('is-hidden');
}

function clearResult() {
  refs.weatherSection.innerHTML = '';
}
