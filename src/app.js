function displayTemperature(response) {
  console.log(response);

  let cityState = document.querySelector('#city-state');
  let temp = document.querySelector('#temperature');
  let hum = document.querySelector('#hum');
  let speed = document.querySelector('#speed');
  let desc = document.querySelector('#description');
  cityState.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  temp.innerHTML = Math.round(response.data.main.temp);
  desc.innerHTML = `${response.data.weather[0].description}`;
  hum.innerHTML = `Humidity: ${response.data.main.humidity}`;
  speed.innerHTML = `Wind Speed: ${response.data.wind.speed}`;
}

let apiKey = '860125333e4516777dadc25699e05462';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
//console.log(apiKey);
//console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
