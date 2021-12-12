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
  cityState.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  temp.innerHTML = Math.round(response.data.main.temp);
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

let form = document.querySelector('#search');
form.addEventListener('submit', handleSubmit);
