<?php
    $host = "localhost"; //database location
    $user = "root"; //database username
    $pass = ""; //database password
    $db_name = "taskmanager"; //database name
    //database connection
    $link = mysql_connect($host, $user, $pass);
    $connect = mysql_select_db($db_name);
    //sets encoding to utf8
    if (!$link) {
        die('Could not connect: ' . mysql_error());
    }
    echo 'Connected successfully';
?>