<?php
$ip = $_SERVER['REMOTE_ADDR'];
$log = date("Y-m-d H:i:s") . " - " . $ip . "\n";
file_put_contents(__DIR__."/admin/visitas.txt", $log, FILE_APPEND);
?>
