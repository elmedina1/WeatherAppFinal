function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDay();
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Last updated: ${days[day]} ${hours}:${minutes}`;
  //calculate the date
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[day];
}
function getForecast(coordinates) {
  console.log('coor' + coordinates);
  let h2 = document.querySelector('#city-state');
  let row2 = document.querySelector('#row-two');
  let row3 = document.querySelector('#forecast');

  let apiKey = '860125333e4516777dadc25699e05462';
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl1);
  axios.get(apiUrl1).then(displayForecast);
}
function displayTemperature(response) {
  console.log(response);

  let cityState = document.querySelector('#city-state');
  let temp = document.querySelector('#temperature');
  let hum = document.querySelector('#hum');
  let speed = document.querySelector('#speed');
  let desc = document.querySelector('#description');
  let date = document.querySelector('#date');
  let image = document.querySelector('#image');

  celTemp = response.data.main.temp;

  cityState.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  temp.innerHTML = `${Math.round(celTemp)}<sup>℃</sup>`;
  desc.innerHTML = `${response.data.weather[0].description}`;
  hum.innerHTML = `Humidity: ${response.data.main.humidity}`;
  speed.innerHTML = `Wind Speed: ${response.data.wind.speed}`;
  date.innerHTML = formatDate(response.data.dt);
  image.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );

  image.setAttribute('alt', `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

//console.log(apiKey);
//console.log(apiUrl);

function search(city) {
  let apiKey = '860125333e4516777dadc25699e05462';
  let h2 = document.querySelector('#city-state');
  let row2 = document.querySelector('#row-two');
  let row3 = document.querySelector('#forecast');
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();

  let row2 = document.querySelector('#row-two');
  let row3 = document.querySelector('#forecast');

  let city = document.querySelector('#search-input');
  if (city.value.trim() === ' ') {
    row2.innerHTML = 'Sorry, no city found.';
    row3.innerHTML = ' ';
  } else {
    search(city.value);
  }
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let futureForecast = document.querySelector('#forecast');
  let forecastHtml = '<div class="row row-cols-1 row-cols-md-5 g-4 card-row">';

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `
          <div class="col">
            <div class="card">
              <div class="card-body next-days">
                <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                <h2>${Math.round(forecastDay.temp.day)}°</h2>
                <img src>
<img
            id="image_future"
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }.png"
            alt="weather image"
          />

                <ul class="list-group ">
                  <li class="list-group-item li-font-future">
                    <i class="fas fa-arrow-up"></i>${Math.round(
                      forecastDay.temp.max
                    )}°
                    <i class="fas fa-arrow-down min-temp"></i>${Math.round(
                      forecastDay.temp.min
                    )}°
                  </li>
                  <li class="list-group-item li-font-future">
                    <i class="fas fa-tint"></i> ${forecastDay.humidity}%
                  </li>
                  <li class="list-group-item li-font-future">
                    <i class="fas fa-wind"></i> ${forecastDay.wind_speed}km/h
                  </li>
                </ul>
              </div>
            </div>
          </div>`;
    }
  });

  forecastHtml = forecastHtml + `</div>`;

  futureForecast.innerHTML = forecastHtml;
}

//let celTemp = null;

let form = document.querySelector('#search');
form.addEventListener('submit', handleSubmit);

let SearchBtn = document.querySelector('#button-addon2');
form.addEventListener('click', handleSubmit);

function showCurrTempAndCity(position) {
  let lat = position.coords.latitude;
  let log = position.coords.longitude;
  let apiKey = '860125333e4516777dadc25699e05462';
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?`;

  let h2 = document.querySelector('#city-state');
  let dateField = document.querySelector('#date');
  let desc = document.querySelector('#description');
  let hum = document.querySelector('#hum');
  let speed = document.querySelector('#speed');
  let image = document.querySelector('#image');
  let temp = document.querySelector('#temperature');

  axios
    .get(`${urlApi}lat=${lat}&lon=${log}&units=metric&appid=${apiKey}`)
    .then((response) => {
      console.log('sadadad222');
      console.log(response.data);
      h2.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

      dateField.innerHTML = formatDay(response.data.dt);
      desc.innerHTML = `${response.data.weather[0].description}`;
      hum.innerHTML = `Humidity: ${response.data.main.humidity}`;
      speed.innerHTML = `Wind Speed: ${response.data.wind.speed}`;
      image.setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
      );
      temp.innerHTML = `${Math.round(response.data.main.temp)}<sup>℃</sup>`;
      getForecast(response.data.coord);
    });
}

function getCurrentLocationTemp() {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrTempAndCity);
}

getCurrentLocationTemp();
