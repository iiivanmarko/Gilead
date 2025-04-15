<?php 


function getname(){

$name = "";
foreach (glob ("../js*") as $js) {
$name = $js;
};

return $name;

};

$name = getname();
$newname = "../js".time();
rename($name,$newname);

$file = fopen('cache.txt','w');
fwrite($file,str_replace("../","",$newname));
fclose($file);
