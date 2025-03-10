const apiKey = 'db87c886402c6cf2614d5430f779e5bd'; 
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    fetch(`${weatherApiUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = `<p class='error'>${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { name, main, weather, wind } = data;
    const weatherCondition = weather[0].main;
    const temperature = main.temp;

    // Define temperature-based backgrounds
    let backgroundImage = '';

    if (temperature <= 0) {
        backgroundImage = 'url("images/cold.png")'; // Freezing cold
    } else if (temperature > 0 && temperature <= 15) {
        backgroundImage = 'url("images/cool.png")'; // Cool weather
    } else if (temperature > 15 && temperature <= 25) {
        backgroundImage = 'url("images/moderate.png")'; // Moderate weather
    } else if (temperature > 25 && temperature <= 35) {
        backgroundImage = 'url("images/warm.png")'; // Warm weather
    } else {
        backgroundImage = 'url("images/hot.png")'; // Hot weather
    }

    // Apply background image
    document.body.style.backgroundImage = backgroundImage;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    // Weather icons
    const icons = {
        Clear: '☀️',
        Clouds: '☁️',
        Rain: '🌧️',
        Snow: '❄️',
        Thunderstorm: '⛈️',
        Drizzle: '🌦️',
        Mist: '🌫️'
    };

    document.getElementById('weatherInfo').innerHTML = `
        <div class='weather-card'>
            <h2>${name}</h2>
            <p>${icons[weatherCondition] || '☁️'} ${weatherCondition}</p>
            <p>Temperature: ${main.temp}°C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
        </div>
    `;
}
