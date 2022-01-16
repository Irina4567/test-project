<?php
  $data = [];
  foreach ($_POST as $key => $value) {
    $data[($key)]=$value;
  }
  echo json_encode($data);
?>
