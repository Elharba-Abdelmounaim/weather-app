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
    "temp" => $data['current']['temp_c'],
    "desc" => $data['current']['condition']['text']
];

echo json_encode($result);
