const baseURL = 'https://restcountries.eu/rest/v2/name/';

export default function fetchWeather(name) {
  return fetch(baseURL + name)
    .then(response => response.json())
    .catch(error => console.log(error));
}
