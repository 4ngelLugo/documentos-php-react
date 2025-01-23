<?php

try {
  $conn = new PDO('mysql:host=localhost;dbname=paginatic', 'root', '');
} catch (PDOException $e) {
  echo $e->getMessage();
};
