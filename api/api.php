<?php
function GETConnection() {
	$host = "localhost";
	//database location
	$user = "root";
	//database username
	$pass = "";
	//database password
	$db_name = "dTaskManager";
	//database name
	//database connection
	$link = mysql_connect($host, $user, $pass);
	return $link;
}
//if(isset($_GET['method'])&& !empty($_GET['method'])){
	if(function_exists($_GET['method'])){
		$_GET['method']();
		echo $_GET['method'];
	}
//}
function GETTodo() {
	$link = GETConnection();
	foreach($_GET as $name => $value) {
		print "$name : $value<br>";
	}
	echo 'Hi There';
	/*
	mysql_select_db("todo", $link);
		$sql = "INSERT INTO todo (id,title, note, createdDate, dueDate, status) VALUES('','$wine->title','$wine->note','$wine->createdDate','$wine->dueDate','$wine->status')";
		if (!mysql_query($sql, $link)) {
			die('Error: ' . mysql_error());
		}
		return json_encode($wine);*/
	
}
?>