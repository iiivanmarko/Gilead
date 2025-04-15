<?php 

$data = file_get_contents('../js/database.json');
if ($data === false) {
    echo json_encode([]);
} else {
    echo $data;
}
?>