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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// get weather for forecast
function displayForecast(response) {
  let weeklyForecast = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  weeklyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        class="current-weather-icon"
        id="current-weather-icon"
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="weather-forecast-temperature-max high-temp">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
  // console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  // console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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
  // console.log(response.data);

  getForecast(response.data.coord);
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
