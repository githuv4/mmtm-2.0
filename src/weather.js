// 5
const weather = document.querySelector(".js-weather");

const API_KEY = "52b3f7cb409432ee62840b7466818803";

// 3
const COORDS = "coords";

// 4
function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    // 6
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}@${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  console.log(position.coords.latitude);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  // console.log(coordsObj);
  saveCoords(coordsObj);
}

function handleGeoError() {
  console.log("cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

// 2
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

// 1
function init() {
  loadCoords();
}

init();
