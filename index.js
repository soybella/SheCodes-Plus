function weatherDateInfo(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

let weatherCurrentDate = document.querySelector("div#current-day-info");
let currentDate = new Date();

weatherCurrentDate.innerHTML = weatherDateInfo(currentDate);

// get weather from city input

function getCurrentWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let icon = document.querySelector("#current-weather-icon");

  let showTemperature = document.querySelector("#current-temp");
  showTemperature.innerHTML = temperature;

  let showHumidity = document.querySelector(
    "#current-city-humidity-percentage"
  );
  showHumidity.innerHTML = `${humidity}%`;

  let showWind = document.querySelector("#current-city-wind-mph");
  showWind.innerHTML = `${wind}mph`;

  let showDescription = document.querySelector("#current-description");
  showDescription.innerHTML = description;

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(icon);
}

function inputCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(getCurrentWeather);
  // console.log(apiUrl);
}

let searchCityForm = document.querySelector("#submit-city-form");
searchCityForm.addEventListener("submit", inputCity);

// Show current location

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(getCurrentWeather);
  // console.log(apiUrl);
}

function haltCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let searchCurrentLocation = document.querySelector("#current-city-button");
searchCurrentLocation.addEventListener("click", haltCurrentLocation);

function changeToFahrenheit() {
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let currentCelsiusTemp = document.querySelector("#current-temp");
  let celsiusTemp = currentCelsiusTemp.innerHTML;
  celsiusTemp = Number(celsiusTemp);
  currentCelsiusTemp.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);
}

let fahrenheit = document.querySelector("#fahrenheit-symbol");
fahrenheit.addEventListener("click", changeToFahrenheit);

function changeToCelsius() {
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let currentFahrenheitTemp = document.querySelector("#current-temp");
  let fahrenheitTemp = currentFahrenheitTemp.innerHTML;
  fahrenheitTemp = Number(fahrenheitTemp);
  currentFahrenheitTemp.innerHTML = Math.round(((fahrenheitTemp - 32) * 5) / 9);
}

let celsius = document.querySelector("#celsius-symbol");
celsius.addEventListener("click", changeToCelsius);
