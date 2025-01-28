<?php

class user {
  private $conn;
  private $usersTable = 'usuarios';
  private $rolesTable = 'roles';

  public function __construct($db) {
    $this->conn = $db;
  }

  public function findById($id) {
    $get_user = $this->conn->prepare("SELECT * FROM {$this->usersTable} WHERE usuarioId = :id");
    $get_user->bindParam(':id', $id);
    $get_user->execute();

    $get_role = $this->conn->prepare("SELECT * FROM {$this->usersTable} INNER JOIN {$this->rolesTable} ON {$this->usersTable}.rolId = {$this->rolesTable}.rolId WHERE usuarioId = :id");
    $get_role->bindParam(':id', $id);
    $get_role->execute();

    $user = $get_user->fetch(PDO::FETCH_ASSOC);
    $role = $get_role->fetch(PDO::FETCH_ASSOC);

    $role_name = $role['rolNombre'];

    return [$user, $role_name];
  }

  public function validateLogIn($id, $password) {
    $user = $this->findById($id);
    
    // password_verify($password, $user['usuarioContrasena']
    if ($user[0]['usuarioNombre'] && $password === $user[0]['usuarioContrasena']) {
      return $user;
    }

    return null;
  }
}