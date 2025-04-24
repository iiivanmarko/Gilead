<?php
require 'db_config.inc.php'; 

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

// Delete all records
$conn->query("DELETE FROM flowers");

// Reset auto-increment
$conn->query("ALTER TABLE flowers AUTO_INCREMENT = 1");

echo json_encode(["success" => true, "message" => "Flowers table reset."]);

$conn->close();