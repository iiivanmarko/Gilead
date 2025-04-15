

<?php 
 $folder = file_get_contents("cache.txt");

$clean = file_get_contents("../$folder/clear.json");
$file = fopen("../$folder/database.json",'w');
fwrite($file,$clean);
fclose($file);

?>