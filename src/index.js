import './styles.css';

import 'pnotify/dist/PNotifyBrightTheme.css';
import PNotify from 'pnotify/dist/es/PNotify';

import countryShowTemplate from './templates/countryMarkupTemplate.hbs';
import countriesShowTemplate from './templates/countriesMarkupTemplate.hbs';

import fetchCountries from './js/fetchCountries';
import spinner from './js/spinner';

const debounce = require('lodash.debounce');

const refs = {
  inputForm: document.querySelector('#input-form'),
  countrySection: document.querySelector('#country'),
  countriesSection: document.querySelector('#countries')
};

refs.inputForm.addEventListener('input', debounce(searchInputHandler, 1000));

function searchInputHandler(e) {
  e.preventDefault();

  const input = e.target;
  clearResult();

  spinner.show();
  fetchCountries(input.value)
    .then(countries => {
      spinner.hide();
      if (countries.length === 1) {
        return insertCountryMarkup(countries);
      } else if (countries.length > 1 && countries.length <= 10) {
        return insertCountriesMarkup(countries);
      } else {
        PNotify.error({
          text: 'Too many matches find. Please enter a more specific query',
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
  input.value = '';
}

function insertCountriesMarkup(countries) {
  const markup = countries.map(country => {
    return countriesShowTemplate(country);
  }).join(' ');
  refs.countriesSection.insertAdjacentHTML('beforeend', markup);
  refs.countriesSection.classList.remove('is-hidden');
}

function insertCountryMarkup(countries) {
  const markup = countries.map(country => {
    return countryShowTemplate(country);
  });
  refs.countrySection.insertAdjacentHTML('beforeend', markup);
  refs.countrySection.classList.remove('is-hidden');
}

function clearResult() {
  refs.countrySection.innerHTML = '';
  refs.countriesSection.innerHTML = '';
}