<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Check if city parameter is provided
if (!isset($_GET['city']) || empty($_GET['city'])) {
    echo json_encode(["error" => "City parameter is required"]);
    exit;
}

$city = urlencode($_GET['city']);
$apiKey = "5cc8d21d86a54f19a5b232516252312"; // Replace with your actual API key

// Construct API URL
$url = "http://api.weatherapi.com/v1/current.json?key=$apiKey&q=$city&aqi=no";

// Initialize cURL for better error handling
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

curl_close($ch);

// Handle cURL errors
if ($curlError) {
    echo json_encode(["error" => "Network error: $curlError"]);
    exit;
}

// Handle HTTP errors
if ($httpCode !== 200) {
    $errorMsg = "API request failed";
    
    if ($httpCode === 400) {
        $errorMsg = "Invalid city name. Please check your input.";
    } elseif ($httpCode === 401) {
        $errorMsg = "API key is invalid or expired";
    } elseif ($httpCode === 403) {
        $errorMsg = "Access forbidden. Please check your API key permissions.";
    } elseif ($httpCode === 404) {
        $errorMsg = "City not found. Please try another city.";
    } elseif ($httpCode >= 500) {
        $errorMsg = "Weather service is temporarily unavailable. Please try again later.";
    }
    
    echo json_encode(["error" => $errorMsg]);
    exit;
}

// Decode JSON response
$data = json_decode($response, true);

// Check if data is valid
if (!isset($data['current'])) {
    echo json_encode(["error" => "Invalid weather data received from API"]);
    exit;
}

// Extract required data
$result = [
    "temp_c" => $data['current']['temp_c'],
    "temp_f" => $data['current']['temp_f'],
    "desc" => $data['current']['condition']['text'],
    "icon" => "http:" . $data['current']['condition']['icon'],
    "feelslike_c" => $data['current']['feelslike_c'],
    "wind_kph" => $data['current']['wind_kph'],
    "wind_dir" => $data['current']['wind_dir'],
    "humidity" => $data['current']['humidity'],
    "pressure_mb" => $data['current']['pressure_mb'],
    "precip_mm" => $data['current']['precip_mm'],
    "location" => [
        "name" => $data['location']['name'],
        "country" => $data['location']['country'],
        "region" => $data['location']['region'] ?? ''
    ]
];

// Return JSON response
echo json_encode($result);
?>