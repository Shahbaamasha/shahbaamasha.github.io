const RAIN = `<img src="./images/rain.svg" alt="Rainy Weather">`;
const SUN = `<img src="./images/sun.svg" alt="Sunny Weather">`;
const CLOUDS = `<img src="./images/clouds.svg" alt="Cloudy Weather">`;
const WIND = `<img src="./images/wind.svg.svg" alt="">`;
const SUNRISE = `<img src="./images/sunrise.svg" alt="">`;
const SUNSET = `<img src="./images/sunset.svg" alt="">`;

const TEMPERATURE_CONVERSION_FACTOR = 13;
const STORAGE_KEY = 'WeatherData';

const weatherApp = {
    STORAGE_KEY,
    gWeather: loadFromStorage(STORAGE_KEY) || {},
};

let button = document.querySelector('.button');
let inputValue = document.querySelector('.inputValue');
let city = document.querySelector('.city');
let desc = document.querySelector('.desc');
let temp = document.querySelector('.temp');
let country = document.querySelector('.country');
let wind = document.querySelector('.wind');
let sunset = document.querySelector('.sunset');
let sunrise = document.querySelector('.sunrise');
let svgContainer = document.querySelector('.svg-container');
let svgSunset = document.querySelector('.svg_sunset');
let svgSunrise = document.querySelector('.svg_sunrise');

displayWeatherData(weatherApp.gWeather);

button.addEventListener('click', function () {
    clearStorage(STORAGE_KEY);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=44e65086e035df4b604d6685b1026c16`)
        .then(response => response.json())
        .then(data => {
            weatherApp.gWeather = loadFromStorage(STORAGE_KEY) || {};
            const key = `${inputValue.value.toLowerCase()}_${Date.now()}`;
            weatherApp.gWeather[key] = data;
            saveToStorage(STORAGE_KEY, weatherApp.gWeather);

            displayCurrentWeather(data);
        })
        .catch(err => handleError(err));
});

function displayCurrentWeather(data) {
    if (!data || !data.name || !data.main || !data.weather || !data.weather[0] || !data.sys || !data.sys.country || !data.sys.sunrise || !data.sys.sunset || !data.wind) {
        console.error('Invalid or incomplete data:', data);
        alert('Invalid or incomplete data. Please try again.');
        return;
    }

    let nameValue = data.name;
    let tempValue = data.main.temp;
    let descValue = data.weather[0].description;
    let countryValue = data.sys.country;
    let sunsetValue = data.sys.sunset;
    let sunriseValue = data.sys.sunrise;
    let windValue = data.wind.speed;

    svgSunset.innerHTML = SUNSET;
    svgSunrise.innerHTML = SUNRISE;

    city.innerHTML = `${nameValue}, ${countryValue}`;
    desc.innerHTML = `Description: ${descValue}`;
    temp.innerHTML = `${(tempValue / TEMPERATURE_CONVERSION_FACTOR).toFixed(0)}°C`;
    sunrise.innerHTML = `Sunrise: ${getDate(sunriseValue)}`;
    sunset.innerHTML = `Sunset: ${getDate(sunsetValue)}`;
    wind.innerHTML = `Wind Speed: ${windValue} m/s`;

    if (data.weather[0].main === "Clouds") {
        svgContainer.innerHTML = CLOUDS;
    } else if (data.weather[0].main === "Clear") {
        svgContainer.innerHTML = SUN;
    } else {
        svgContainer.innerHTML = RAIN;
    }
}


function handleError(error) {
    console.error('Error:', error);
    alert('Something went wrong. Please try again.');
}

function getDate(num) {
    let date = new Date(num * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `The time is: ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function saveToStorage(key, val) {
    const str = JSON.stringify(val);
    localStorage.setItem(key, str);
}

function loadFromStorage(key) {
    const str = localStorage.getItem(key);
    const val = JSON.parse(str);
    return val;
}

function clearStorage(key) {
    localStorage.removeItem(key);
}

function displayWeatherData(weatherData) {
    if (!weatherData) {
        return;
    }

    const latestKey = Object.keys(weatherData)[Object.keys(weatherData).length - 1];
    const latestWeather = weatherData[latestKey];

    displayCurrentWeather(latestWeather);
}
