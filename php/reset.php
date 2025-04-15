<?php 

$clean = file_get_contents('../js/clear.json');
$file = fopen('../js/database.json','w');
fwrite($file,$clean);
fclose($file);

?>