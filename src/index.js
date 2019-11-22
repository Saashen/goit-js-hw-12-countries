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
};

refs.inputForm.addEventListener('input', debounce(searchInputHandler, 1000));

function searchInputHandler(e) {
  const input = e.target;
  clearResult();

  spinner.show();
  fetchCountries(input.value)
    .then(checkOne => {
      if (checkOne.length <= 10) {
        return checkOne;
      } else {
        const notice = PNotify.error({
          text: 'Too many matches find. Please enter a more specific query',
        });
        return notice;
      }
    })
    .then(checkTwo => {
      if (checkTwo.length === 1) {
        return checkTwo;
      } else {
        checkTwo.forEach(country => {
          return insertCountriesMarkup(country);
        });
      }
    })
    .then(countries => {
      spinner.hide();
      countries.forEach(country => {
        return insertCountryMarkup(country);
      });
    })
    .catch(error => {
      console.log(error);
    });

  input.value = '';
}

function insertCountriesMarkup(items) {
  const markup = countriesShowTemplate(items);
  refs.countrySection.insertAdjacentHTML('beforeend', markup);
  refs.countrySection.classList.remove('is-hidden');
}

function insertCountryMarkup(item) {
  const markup = countryShowTemplate(item);
  refs.countrySection.insertAdjacentHTML('beforeend', markup);
  refs.countrySection.classList.remove('is-hidden');
}

function clearResult() {
  refs.countrySection.innerHTML = '';
}
