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

require_once 'controllers/AuthController.php';
require_once 'config/database.php';

$output = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  $database = new Database();
  $db = $database->getConnection();

  $authController = new AuthController($db);

  $id = $_POST['id'] ?? null;
  $name = $_POST['name'] ?? null;
  $surname = $_POST['surname'] ?? null;
  $email = $_POST['email'] ?? null;
  $phone = $_POST['phone'] ?? null;
  $password = $_POST['password'] ?? null;
  $role = $_POST['role'] ?? null;

  $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
  
  $image = $_FILES['image'] ?? null;

  $output = $authController->register($id, $name, $surname, $email, $phone, $hashedPassword, $role, $image);
} else {
  $output = ['error' => 'invalid method'];
}

echo json_encode($output);

exit();
