# Weather App 🌤️

Weather App is a simple web application that provides the current weather for any city using the **WeatherAPI**.  
The project is built with **HTML, CSS, JavaScript, and PHP**.

## 🌐 Live Demo

You can view the live version of the Weather App here:

👉 https://elharba-abdelmounaim.github.io/weather-app/pro/

---

## Features

- Search weather by city name
- Display essential weather information:
  - Temperature in °C and °F
  - Weather description (e.g., Overcast, Rain, Sunny)
  - Weather icon
  - Feels like temperature
  - Wind speed and direction
  - Humidity
  - Pressure
  - Precipitation
- Location information: city name, country, and region
- Dark/Light mode toggle
- Favorite cities with save functionality
- Responsive design for all devices
- Auto-refresh of weather information
- Search autocomplete suggestions

---

##  Technologies

**Frontend:**
- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (ES6+)
- Font Awesome for icons
- Google Fonts for typography

**Backend:**
- PHP (for WeatherAPI integration)
- WeatherAPI ([https://www.weatherapi.com/](https://www.weatherapi.com/))

**Development Tools:**
- JSON for data transfer between PHP and Frontend
- Local Storage for saving preferences
- Geolocation API for location detection
- Can run on localhost without Docker

---

##  How to Run Locally

**Prerequisites:**
- Local web server (XAMPP, WAMP, MAMP, or PHP Built-in Server)
- PHP 7.0 or higher
- Modern web browser
- API key from WeatherAPI.com

**Setup Steps:**

1. **Clone or Download the Project:**
```bash
# Clone via Git
git clone [project-url]
cd weather-app

# Or download the ZIP file and extract it

```

Set Up in Local Server Directory:

Copy the project folder to htdocs (for XAMPP) or www (for WAMP)

Configure API Key:
```
Open weather.php file
```

Find the line:

```
$apiKey = "YOUR_API_KEY_HERE";

Replace YOUR_API_KEY_HERE with your actual WeatherAPI key

```
Start the Local Server:

Open XAMPP/WAMP and start Apache


Or use PHP built-in server:

```
php -S localhost:8000
```

Access the Application:

Open your browser and go to:
```
http://localhost/weather-app
```

or
```
http://localhost:8000
```

Start Using:

Enter a city name in the search field

Click "Search" or "Use My Location" button
