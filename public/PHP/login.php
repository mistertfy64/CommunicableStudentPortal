 <?php
    session_start();

    if($_GET[action]=="login"){


    $sql = "SELECT FROM [] WHERE username = '$username' AND password = '$password'";
    $result= $connect->query($sql);
    $query = mysql_query($sql)or die("query error");
    $userfound = mysql_num_rows($result);

      if($userfound == 1){
        $row = $result->fetch_asoc();

        $_SESSION[firstname] = $row[firstname];
	      $_SESSION[lastname] = $row[lastname];
	      $_SESSION[username] = $row[username];
	      $_SESSION[email] = $row[email];
        $_SESSION[memebrID] = $row[memberID];
	      $_SESSION[tel] = $row[tel];
        $_SESSION[year] = $row[year];
        $_SESSION[level] = $row[level];

        header('location: index.ejs');
      }else{
        
      }
    }

?>