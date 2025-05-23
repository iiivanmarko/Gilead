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
" . str_repeat("('andre.reitter@gilead.com', '', ''),\n", 25) . "('andre.reitter@gilead.com', '', '');

INSERT INTO flowers (owner, wunsch, time) VALUES
" . str_repeat("('monika.poelzleitner@gilead.com', '', ''),\n", 25) . "('monika.poelzleitner@gilead.com', '', '');

INSERT INTO flowers (owner, wunsch, time) VALUES
" . str_repeat("('jelena.grubesic@gilead.com', '', ''),\n", 26) . "('jelena.grubesic@gilead.com', '', '');
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