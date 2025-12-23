function getWeather() {
    const city = document.getElementById('city').value;
    fetch(`weather.php?city=${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('result').innerHTML = data.error;
                return;
            }
            document.getElementById('result').innerHTML = `
                <img src="${data.icon}" alt="Weather Icon">
                <p>🌡️ Temperature: ${data.temp_c} °C (Feels like ${data.feelslike_c} °C)</p>
                <p>☁️ Weather: ${data.desc}</p>
                <p>💨 Wind: ${data.wind_kph} kph ${data.wind_dir}</p>
                <p>💧 Humidity: ${data.humidity}%</p>
                <p>🌡️ Pressure: ${data.pressure_mb} mb</p>
                <p>☔ Precipitation: ${data.precip_mm} mm</p>
            `;
        })
        .catch(err => {
            document.getElementById('result').innerHTML = "Error fetching weather";
        });
}