const baseURL = 'http://api.weatherstack.com/current';

export default function fetchWeather(query) {
    const options = {
      access_key: '?access_key=e80b1338f6db063f3d397ba66dc07fa6',
      query: `&query=${query}`,
    };

    return fetch(baseURL + options.access_key + options.query)
      .then(response => response.json())
      .catch(error => {
        console.error(error.message);
      });
  }