// DOM Elements
const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const unitButtons = document.querySelectorAll('.unit-btn');

// State variables
let currentWeatherData = null;
let isCelsius = true;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    searchBtn.addEventListener('click', getWeather);
    locationBtn.addEventListener('click', getWeatherByLocation);
    
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });
    
    // Add unit toggle functionality
    unitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const unit = this.getAttribute('data-unit');
            toggleTemperatureUnit(unit);
        });
    });
    
    // Try to get weather for a default city on load
    setTimeout(() => {
        if (!currentWeatherData) {
            searchExample('London');
        }
    }, 500);
});

// Get weather by city name
async function getWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    // Show loading state
    showLoading();
    
    try {
        const response = await fetch(`weather.php?city=${encodeURIComponent(city)}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data.error) {
            showError(data.error);
            return;
        }
        
        // Store data and update UI
        currentWeatherData = data;
        updateWeatherDisplay(data);
        updateLastUpdateTime();
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError('Cannot fetch weather. Please check your internet connection and try again.');
    }
}

// Get weather by user's location
async function getWeatherByLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    showLoading();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            try {
                const response = await fetch(`weather.php?city=${latitude},${longitude}`);
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                
                if (data.error) {
                    showError(data.error);
                    return;
                }
                
                // Store data and update UI
                currentWeatherData = data;
                updateWeatherDisplay(data);
                updateLastUpdateTime();
                cityInput.value = ''; // Clear input since we used location
                
            } catch (error) {
                console.error('Error fetching weather:', error);
                showError('Cannot fetch weather. Please try again.');
            }
        },
        (error) => {
            console.error('Geolocation error:', error);
            showError('Unable to retrieve your location. Please enter a city manually.');
        }
    );
}

// Update weather display with data
function updateWeatherDisplay(data) {
    // Hide loading and error, show result
    hideLoading();
    hideError();
    resultDiv.classList.remove('hidden');
    
    // Update city name and time
    document.getElementById('city-name').textContent = cityInput.value || 'Your Location';
    document.getElementById('current-time').textContent = getCurrentTime();
    
    // Update temperature based on current unit
    updateTemperatureDisplay(data);
    
    // Update other weather info
    document.getElementById('weather-desc').textContent = data.desc;
    document.getElementById('weather-icon').src = data.icon;
    document.getElementById('weather-icon').alt = data.desc;
    
    document.getElementById('wind-value').textContent = `${data.wind_kph} kph`;
    document.getElementById('wind-direction').textContent = data.wind_dir;
    document.getElementById('humidity-value').textContent = `${data.humidity}%`;
    document.getElementById('pressure-value').textContent = `${data.pressure_mb} mb`;
    document.getElementById('precipitation-value').textContent = `${data.precip_mm} mm`;
}

// Update temperature display based on selected unit
function updateTemperatureDisplay(data) {
    if (isCelsius) {
        document.getElementById('temp-value').textContent = Math.round(data.temp_c);
        document.getElementById('feels-like').textContent = Math.round(data.feelslike_c);
    } else {
        document.getElementById('temp-value').textContent = Math.round(data.temp_f);
        document.getElementById('feels-like').textContent = Math.round((data.feelslike_c * 9/5) + 32);
    }
}

// Toggle between Celsius and Fahrenheit
function toggleTemperatureUnit(unit) {
    // Update active button state
    unitButtons.forEach(button => {
        if (button.getAttribute('data-unit') === unit) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Update unit state
    isCelsius = (unit === 'celsius');
    
    // Update temperature display if we have data
    if (currentWeatherData) {
        updateTemperatureDisplay(currentWeatherData);
    }
}

// Show loading state
function showLoading() {
    loadingDiv.classList.remove('hidden');
    resultDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
}

// Hide loading state
function hideLoading() {
    loadingDiv.classList.add('hidden');
}

// Show error state
function showError(message) {
    errorMessage.textContent = message;
    errorDiv.classList.remove('hidden');
    resultDiv.classList.add('hidden');
    loadingDiv.classList.add('hidden');
}

// Hide error state
function hideError() {
    errorDiv.classList.add('hidden');
    cityInput.focus();
}

// Get current time in readable format
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.getElementById('last-update').textContent = `Last updated: ${timeString}`;
}

// Search example cities
function searchExample(city) {
    cityInput.value = city;
    getWeather();
}