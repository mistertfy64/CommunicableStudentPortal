<?php
    if($_GET["action"]=="createtopic"){

        $hostname = "";
		$connect = new mysqli();
        $sql = "INSERT INTO [a] (a) VALUES ('$_POST[a]')";
        $query = $connect->query($sql);

        if($query){
			
		}else{
			
        }

    }
?>