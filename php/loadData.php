<?php
require 'db_config.inc.php'; 

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

$owner = $_POST['owner'];

$sql = "SELECT * FROM flowers ORDER BY owner = ? DESC, id ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $owner);
$stmt->execute();

$result = $stmt->get_result();
$data = [];
$sorted = [];
$others = [];

while ($row = $result->fetch_assoc()) {
    if ($row['owner'] === $owner) {
        $sorted[] = $row;
    } else {
        $others[] = $row;
    }
}

echo json_encode(array_merge($sorted, $others));

$stmt->close();
$conn->close();