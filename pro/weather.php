<?php
$city = urlencode($_GET['city']);
$apiKey = "5cc8d21d86a54f19a5b232516252312";

$url = "http://api.weatherapi.com/v1/current.json?key=$apiKey&q=$city&aqi=no";
$response = @file_get_contents($url);

if (!$response) {
    echo json_encode(["error" => "Cannot fetch weather. Check API key or city name"]);
    exit;
}

$data = json_decode($response, true);

if (!isset($data['current'])) {
    echo json_encode(["error" => "City not found or API error"]);
    exit;
}

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
    "precip_mm" => $data['current']['precip_mm']
];

echo json_encode($result);
