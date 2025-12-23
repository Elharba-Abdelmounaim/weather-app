<?php

$city = $_GET['city'];
$apiKey = "e8e62474b1f68e93ed27f196af157c31";

$url = "https://api.openweathermap.org/data/2.5/weather?q=$city&units=metric&appid=$apiKey";

$response = file_get_contents($url);
$data = json_decode($response, true);

if ($data['cod'] != 200) {
    echo json_encode(["error" => "City not found"]);
    exit;
}

$result = [
    "temp" => $data['main']['temp'],
    "desc" => $data['weather'][0]['description']
];

echo json_encode($result);
