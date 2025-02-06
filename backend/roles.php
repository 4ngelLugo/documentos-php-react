<?php

ini_set('session.cookie_domain', '.localhost');
ini_set('session.cookie_path', '/');
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-type: application/json; charset=utf-8");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

require_once 'controllers/RoleController.php';
require_once 'config/database.php';

$output = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $database = new Database();
  $db = $database->getConnection();

  $roleController = new RoleController($db);

  $output = $roleController->returnRoles();
} else {
  $output = ['error' => 'invalid method'];
}

echo json_encode($output);

exit();
