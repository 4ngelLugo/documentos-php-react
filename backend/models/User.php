<?php

class user
{
  private $conn;
  private $usersTable = 'usuarios';
  private $rolesTable = 'roles';

  public function __construct($db)
  {
    $this->conn = $db;
  }

  public function findById($id)
  {
    $get_user = $this->conn->prepare("SELECT * FROM {$this->usersTable} WHERE usuarioId = :id");
    $get_user->bindParam(':id', $id);
    $get_user->execute();

    $get_role = $this->conn->prepare("SELECT * FROM {$this->usersTable} INNER JOIN {$this->rolesTable} ON {$this->usersTable}.rolId = {$this->rolesTable}.rolId WHERE usuarioId = :id");
    $get_role->bindParam(':id', $id);
    $get_role->execute();

    $user = $get_user->fetch(PDO::FETCH_ASSOC);
    $role = $get_role->fetch(PDO::FETCH_ASSOC);

    $role_name = $role['rolNombre'] ?? null;

    return [$user, $role_name];
  }

  public function validateLogIn($id, $password)
  {
    $user = $this->findById($id);

    // password_verify($password, $user['usuarioContrasena']
    if ($user[0]['usuarioNombre'] && $password === $user[0]['usuarioContrasena']) {
      return $user;
    }

    return null;
  }

  public function registerUser($id, $name, $surname, $email, $phone, $password, $role, $image)
  {

    $user = $this->findById($id);

    if (isset($user[0]['usuarioID'])) {
      return ['error' => 'user already exist'];
    }

    $imageTemp = $image ? $image['tmp_name'] : null;
    $imageContent = file_get_contents($imageTemp);

    $save_user = $this->conn->prepare(
      "INSERT INTO {$this->usersTable} VALUES (:id, :name, :surname, :email, :phone, :password, :role, :image)"
    );
    $save_user->bindParam(':id', $id);
    $save_user->bindParam(':name', $name);
    $save_user->bindParam(':surname', $surname);
    $save_user->bindParam(':email', $email);
    $save_user->bindParam(':phone', $phone);
    $save_user->bindParam(':password', $password);
    $save_user->bindParam(':role', $role);
    $save_user->bindParam(':image', $imageContent, PDO::PARAM_LOB);

    if ($save_user->execute()) {
      return ['success' => 'User registered'];
    }

    return null;
  }
}
