<?php

require 'Slim/Slim.php';
$app = new Slim();
$app -> get('/', 'getTodayTodo');
$app->get('/post/','getPostTask');
$app->get('/pre/','getPreTask');
$app -> put('/:id', 'updateTodo');
$app -> run();
function updateTodo($id) {
	$link = getConnection();
	$request = Slim::getInstance() -> request();
	$todo = json_decode($request -> getBody());
	mysql_select_db("todo", $link);
	$sql = "UPDATE todo SET note='$todo->note' WHERE id='$todo->id'";
	if (!mysql_query($sql, $link)) {
		die('Error: ' . mysql_error());
	}
	echo json_encode($id);
}

function getTodayTodo() {
	$start = $_GET['start'];
	$end = $_GET['end'];
	$sql_today = "SELECT * FROM `todo` Where Date(`dueDate`) =DATE(NOW())";
	$db = getConnection();
	mysql_select_db("todo", $db);
	$stmt = mysql_query($sql_today);
	while ($values = mysql_fetch_array($stmt)) {
		$arr[] = array('id' => $values['id'], 'title' => $values['title'], 'note' => $values['note'], 'createdDate' => $values['createdDate'], 'dueDate' => $values['dueDate']);

	}
	// echo array("todo" => $arr);
	if (isset($arr)) {
		echo json_encode(array("todo" => $arr));
	} else {
		echo json_encode(array("todo" => 0));
	}
}
function getPostTask(){
	$sql_today = "SELECT * FROM `todo` Where Date(`dueDate`) > DATE(NOW())";
	$db = getConnection();
	mysql_select_db("todo", $db);
	$stmt = mysql_query($sql_today);
	while ($values = mysql_fetch_array($stmt)) {
		$arr[] = array('id' => $values['id'], 'title' => $values['title'], 'note' => $values['note'], 'createdDate' => $values['createdDate'], 'dueDate' => $values['dueDate']);

	}
	// echo array("todo" => $arr);
	if (isset($arr)) {
		echo json_encode(array("todo" => $arr));
	} else {
		echo json_encode(array("todo" => 0));
	}
}
function getPreTask(){
	$sql_today = "SELECT * FROM `todo` Where Date(`dueDate`) < DATE(NOW())";
	$db = getConnection();
	mysql_select_db("todo", $db);
	$stmt = mysql_query($sql_today);
	while ($values = mysql_fetch_array($stmt)) {
		$arr[] = array('id' => $values['id'], 'title' => $values['title'], 'note' => $values['note'], 'createdDate' => $values['createdDate'], 'dueDate' => $values['dueDate']);

	}
	// echo array("todo" => $arr);
	if (isset($arr)) {
		echo json_encode(array("todo" => $arr));
	} else {
		echo json_encode(array("todo" => 0));
	}
}
function getConnection() {
	$host = "localhost";
	//database location
	$user = "root";
	//database username
	$pass = "";
	//database password
	$db_name = "todo";
	//database name
	//database connection
	$link = mysql_connect($host, $user, $pass);
	return $link;
}
?>