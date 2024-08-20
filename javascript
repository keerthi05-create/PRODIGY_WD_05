// script.js

const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const form = document.getElementById('weather-form');
const locationInput = document.getElementById('location-input');
const locationName = document.getElementById('location-name');
const tempElement = document.getElementById('temp');
const weatherCondition = document.getElementById('weather-condition');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const location = locationInput.value.trim();
    if (location) {
        const weatherData = await getWeatherData(location);
        if (weatherData) {
            displayWeatherData(weatherData);
        } else {
            alert('Unable to fetch weather data. Please try again.');
        }
    }
});

async function getWeatherData(location) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        if (data.cod === 200) {
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

function displayWeatherData(data) {
    locationName.textContent = `${data.name}, ${data.sys.country}`;
    tempElement.textContent = data.main.temp.toFixed(1);
    weatherCondition.textContent = data.weather[0].description;
    humidityElement.textContent = data.main.humidity;
    windSpeedElement.textContent = data.wind.speed.toFixed(1);
}
