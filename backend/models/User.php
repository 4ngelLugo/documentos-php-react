<?php

class user {
  private $conn;
  private $table = 'usuarios';

  public function __construct($db) {
    $this->conn = $db;
  }

  public function findById($id) {
    $get_user = $this->conn->prepare("SELECT * FROM {$this->table} WHERE usuarioId = :id");
    $get_user->bindParam(':id', $id);
    $get_user->execute();

    return $get_user->fetch(PDO::FETCH_ASSOC);
  }

  public function validateLogIn($id, $password) {
    $user = $this->findById($id);

    // password_verify($password, $user['usuarioContrasena']
    if ($user && $password === $user['usuarioContrasena']) {
      return $user;
    }

    return null;
  }
}