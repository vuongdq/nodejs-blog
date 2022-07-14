<?php
    $file = fopen("data.txt","r");
    $content = fread($file,10000);
    echo $content;
?>