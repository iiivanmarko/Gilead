<?php 

$data = $_POST["data"];

$file = fopen('../js/database.json','w');
fwrite($file,$data);
fclose($file);


?>