 <?php
    session_start();

    $username = $_POST[username];
    $password = $_POST[password];

    $sql = "SELECT FROM  WHERE username = '$username' AND password = '$password'";
    $query = mysql_query($sql)or die("query error");

?>