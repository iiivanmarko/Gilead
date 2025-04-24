<?php
require 'db_config.inc.php'; 

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name, $db_port);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed"]));
}

$owner = $_POST['owner'];
$flowers = json_decode($_POST['data'], true);

foreach ($flowers as $flower) {
    if ($flower['owner'] === $owner) {
        $id = intval($flower['id']);
        $wunsch = $flower['wunsch'];
        $time = $flower['time'];

        if ($id === 0) {
            // Insert new
            $stmt = $conn->prepare("INSERT INTO flowers (owner, wunsch, time) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $owner, $wunsch, $time);
            $stmt->execute();
            $stmt->close();
        } else {
            // Update existing
            $stmt = $conn->prepare("UPDATE flowers SET wunsch = ?, time = ? WHERE id = ? AND owner = ?");
            $stmt->bind_param("ssis", $wunsch, $time, $id, $owner);
            $stmt->execute();
            $stmt->close();
        }
    }
}

$sql = "SELECT * FROM flowers ORDER BY owner = ? DESC, id ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $owner);
$stmt->execute();
$result = $stmt->get_result();

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