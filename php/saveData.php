<?php 

$data = $_POST["data"];
 $folder = file_get_contents("cache.txt");
$file = fopen("../$folder/database.json",'w');
fwrite($file,$data);
fclose($file);


?>