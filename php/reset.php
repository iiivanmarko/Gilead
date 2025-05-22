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

$insert_sql = "
INSERT INTO flowers (owner, wunsch, time) VALUES
" . str_repeat("('person1', '', ''),\n", 25) . "('person1', '', '');

INSERT INTO flowers (owner, wunsch, time) VALUES
" . str_repeat("('person2', '', ''),\n", 25) . "('person2', '', '');

INSERT INTO flowers (owner, wunsch, time) VALUES
" . str_repeat("('person3', '', ''),\n", 26) . "('person3', '', '');
";

if ($conn->multi_query($insert_sql)) {
    do {
        if ($result = $conn->store_result()) {
            $result->free();
        }
    } while ($conn->more_results() && $conn->next_result());
    echo json_encode(["success" => true, "message" => "Flowers table reset and data reinserted."]);
} else {
    echo json_encode(["error" => "Insert failed", "details" => $conn->error]);
}

$conn->close(); 
?>