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
  $password = $_POST['password'] ?? null;

  $output = $authController->logIn($id, $password);

  if (isset($output['success'])) {
    $user = $output['user'];

    $_SESSION['user'] = [
      'id' => $user[0]['usuarioID'],
      'name' => $user[0]['usuarioNombre'],
      'role' => $user[1],
      'image' => $user[0]['usuarioImagenDir'],
    ];

    array_pop($output);
  }
} else {
  $output = ['error' => 'invalid method'];
}


echo json_encode($output);

exit();
