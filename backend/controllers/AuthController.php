<?php

require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../config/database.php';

class AuthController
{
  private $userModel;

  public function __construct($db)
  {
    $this->userModel = new User($db);
  }

  public function logIn($id, $password)
  {
    if (empty($id) || empty($password)) {
      return ['error' => 'empty fields'];
    }

    $user = $this->userModel->validateLogIn($id, $password);
    if ($user) {
      return ["success" => "logIn success", "user" => $user];
    }

    return ['error' => 'invalid credentials'];
  }

  public function register($id, $name, $surname, $email, $phone, $password, $role, $image)
  {
    if (empty($id) || empty($name) || empty($surname) || empty($email) || empty($password) || empty($role)) {
      return ['error' => 'empty fields'];
    }

    $register = $this->userModel->registerUser($id, $name, $surname, $email, $phone, $password, $role, $image);

    if ($register) {
      return $register;
    }

    ['error' => 'register error'];
  }
}
