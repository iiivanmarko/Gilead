<?php 

$folder = file_get_contents("cache.txt");
$data = file_get_contents("../$folder/database.json");
if ($data === false) {
    echo json_encode([]);
} else {
    echo $data;
}
?>