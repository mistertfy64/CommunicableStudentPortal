 <?php
    session_start();

    $username = $_POST[username];
    $password = $_POST[password];

    $sql = "SELECT FROM [INSERT DATABASE HERE] WHERE username = '$username' AND password = '$password'";
    $query = mysql_query($sql)or die("query error");
    $userfound = mysql_num_rows($query);

    if ($userfound == 1){
        $data = mysql_fetch_array($query);
        $_SESSION[firstname] = $data[firstname];
	    $_SESSION[lastname] = $data[lastname];
	    $_SESSION[username] = $data[username];
	    $_SESSION[email] = $data[email];
        $_SESSION[memebrID] = $data[memberID];
	    $_SESSION[tel] = $data[tel];
        $_SESSION[year] = $data[year];
        $_SESSION[level] = $data[level];
        echo"<center>
            <img src="">
        </center>";
        echo"<script>
			setTimeout(\"window.location.href='index.php'\",3000);
		</script>";
    }else{
        session_abort();
        echo"Login failed!"
        echo"<script>
			setTimeout(\"window.location.href='index.php'\",3000);
		</script>";
    }

?>