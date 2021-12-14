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
  temp.innerHTML = Math.round(celTemp);
  desc.innerHTML = `${response.data.weather[0].description}`;
  hum.innerHTML = `Humidity: ${response.data.main.humidity}`;
  speed.innerHTML = `Wind Speed: ${response.data.wind.speed}`;
  date.innerHTML = formatDate(response.data.dt);
  image.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );

  image.setAttribute('alt', `${response.data.weather[0].description}`);
}

//console.log(apiKey);
//console.log(apiUrl);

function search(city) {
  let apiKey = '860125333e4516777dadc25699e05462';

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector('#search-input');
  search(city.value);
}

function showFarenheitTemp(event) {
  event.preventDefault();

  let temp = document.querySelector('#temperature');
  let fahTemp = Math.round((celTemp * 9) / 5) + 32;
  temp.innerHTML = fahTemp;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temp = document.querySelector('#temperature');
  temp.innerHTML = Math.round(celTemp);
}

function displayForecast() {
  let futureForecast = document.querySelector('#forecast');
  let forecastHtml = '<div class="row row-cols-1 row-cols-md-5 g-4 card-row">';
  let days = [
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
  ];

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
          <div class="col">
            <div class="card">
              <div class="card-body next-days">
                <h5 class="card-title">${day}</h5>
                <h2>21</h2>
                <ul class="list-group li-font">
                  <li class="list-group-item li-font">
                    <i class="fas fa-arrow-up"></i>23
                    <i class="fas fa-arrow-down min-temp"></i>10
                  </li>
                  <li class="list-group-item li-font">
                    <i class="fas fa-tint"></i> 21%
                  </li>
                  <li class="list-group-item li-font">
                    <i class="fas fa-wind"></i> 19km/h
                  </li>
                </ul>
              </div>
            </div>
          </div>`;
  });

  forecastHtml = forecastHtml + `</div>`;

  futureForecast.innerHTML = forecastHtml;
}

let celTemp = null;

let form = document.querySelector('#search');
form.addEventListener('submit', handleSubmit);

let farenheit_link = document.querySelector('#farenheit');
farenheit_link.addEventListener('click', showFarenheitTemp);

let celsius_link = document.querySelector('#celsius');
celsius_link.addEventListener('click', showCelsiusTemp);

displayForecast();
