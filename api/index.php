<?php

require 'Slim/Slim.php';
$app = new Slim();

$app -> post('/', 'addTodo');
$app -> get('/', 'getAllTodo');

$app -> run();
function addTodo() {
    $link = getConnection();
    $request = Slim::getInstance() -> request();
    $todo = json_decode($request -> getBody());

    $duedatetime = strtotime($todo -> duedate);
    $dueDate = date("Y-m-d H:i:s", $duedatetime);
    $createddatetime = strtotime($todo -> createddate);
    $createdDate = date('Y-m-d H:i:s', $createddatetime);
	
    mysql_select_db("taskmanager", $link);
    $sql = "INSERT INTO ttodo (title, description, color,priority, status, starred,duedate,project,createddate	) VALUES('$todo->title','$todo->description','$todo->color','$todo->priority','$todo->status','$todo->starred','$dueDate','$todo->project','$createdDate')";
   
    if (!mysql_query($sql, $link)) {
        die('Error: ' . mysql_error());
    }
	$last_id	=	mysql_insert_id();
    echo ($last_id);

}

function getAllTodo() {
    $start  =   $_GET['start'];
    $end    =   $_GET['end'];
    $sql = "select * FROM ttodo ORDER BY duedate limit ".$start.",". $end;
    $sql_total  =   "select count(*) as total from ttodo";
	$sql_today	=	"SELECT count(*) as today FROM `ttodo` Where Date(`duedate`) =DATE(NOW())";
    $db = getConnection();
    mysql_select_db("taskmanager", $db);
    $stmt = mysql_query($sql);
    $stmt_total= mysql_query($sql_total);
	$stmt_today	=mysql_query($sql_today);	
    $data[0]= mysql_fetch_assoc($stmt_total);
    $data[1]= mysql_fetch_assoc($stmt_today);
    while ($values = mysql_fetch_array($stmt)) {
        $arr[] = array('id' => $values['id'], 'title' => $values['title'], 'description' => $values['description'],'color' => $values['color'],'priority' => $values['priority'],'status'=>$values['status'],'starred'=>$values['starred'],'duedate'=>$values['duedate'],'project'=>$values['project'],'createddate'=>$values['createddate']);
        
    }
  // echo array("todo" => $arr);
  if(isset($arr)){
       echo json_encode(array("todo" => $arr,"result"=>$data));
  }else{
      echo json_encode(array("todo" => 0));
  }
}
function getConnection() {
    $host = "118.139.179.49";
    //database location
    $user = "taskmanager";
    //database username
    $pass = "Task@1234";
    //database password
    $db_name = "taskmanager";
    //database name
    //database connection
    $link = mysql_connect($host, $user, $pass);
    return $link;
}
?>