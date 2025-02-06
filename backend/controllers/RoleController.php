<?php

require_once __DIR__ . '/../models/Role.php';
require_once __DIR__ . '/../config/database.php';

class RoleController
{
  private $roleModel;

  public function __construct($db)
  {
    $this->roleModel = new Role($db);
  }

  public function returnRoles()
  {
    $roles = $this->roleModel->getRoles();

    if ($roles) {
      return $roles;
    }

    return ["error" => "error"];
  }
}
