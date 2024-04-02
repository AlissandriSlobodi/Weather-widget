const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const weatherImage = document.querySelector(".weather-image");
const mainWeather = document.querySelector(".weather");
const defaultImage = "/images/default1.png";

const API_KEY = "64282b471dda15ac479ecc9969fd9ceb";
const API_UNITS = "metric";
const API_LANG = navigator.language.split("-")[0];
const API = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=${API_UNITS}&lang=${API_LANG}`;

async function checkTheWeather(city) {
  try {
    const response = await fetch(`${API}&q=${encodeURIComponent(city)}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      mainWeather.style.display = "none";
    } else {
      const data = await response.json();
      console.log(data);

      updateWeatherData(data);
      updateWeatherImage(data.weather[0].main);

      document.querySelector(".error").style.display = "none";
      mainWeather.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function updateWeatherData(data) {
  const tempElement = document.querySelector(".temp");
  const cityElement = document.querySelector(".city");
  const humidityElement = document.querySelector(".humidity-no");
  const windElement = document.querySelector(".wind-no");

  tempElement.innerHTML = Math.round(data.main.temp) + " &deg;с";
  cityElement.innerHTML = data.name;
  humidityElement.innerHTML = data.main.humidity + " %";
  windElement.innerHTML = data.wind.speed + " км/ч";
}

function updateWeatherImage(weather) {
  switch (weather) {
    case "Clouds":
      weatherImage.src = "/images/clouds.png";
      break;
    case "Clear":
      weatherImage.src = "/images/clear.png";
      break;
    case "Rain":
      weatherImage.src = "/images/rain.png";
      break;
    case "Drizzle":
      weatherImage.src = "/images/drizzle.png";
      break;
    case "Mist":
      weatherImage.src = "/images/mist.png";
      break;
    case "Snow":
      weatherImage.src = "/images/snow.png";
      break;
    default:
      weatherImage.src = defaultImage;
      break;
  }
}

btn.addEventListener("click", onWeatherBtnClick);

function onWeatherBtnClick() {
  checkTheWeather(input.value);
  input.value = "";
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    onWeatherBtnClick();
  }
});
