<?php

class role
{
  private $conn;
  private $table = 'roles';

  public function __construct($db)
  {
    $this->conn = $db;
  }

  public function getRoles()
  {
    $get_role = $this->conn->prepare("SELECT * FROM {$this->table}");
    $get_role->execute();

    return $get_role->fetchAll(PDO::FETCH_ASSOC);
  }
}
