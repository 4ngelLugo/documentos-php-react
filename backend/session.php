<?php

ini_set('session.cookie_domain', '.localhost');
ini_set('session.cookie_path', '/');
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Cookie");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

$output = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  echo $_SESSION['user'];

  $output = $_SESSION['user'] ?? null;
} else {
  $output = ['error' => 'invalid method'];
}

echo json_encode($output);

exit();
