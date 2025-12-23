function getWeather() {
    const city = document.getElementById("city").value;

    fetch("weather.php?city=" + city)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("result").innerHTML = data.error;
            } else {
                document.getElementById("result").innerHTML =
                    `<p>🌡️ Temperature: ${data.temp} °C</p>
                     <p>☁️ Weather: ${data.desc}</p>`;
            }
        });
}
