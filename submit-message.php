<?php
require_once 'includes/dbconfig.php';
include_once 'includes/functions.php';
if(isset($_GET)){
    if(!empty($_GET['sender']) && !empty($_GET['course']) && !empty($_GET['type'])   && !empty($_GET['recipient'])){
        $sender = checkValues($_GET['sender']);
        $recipient = checkValues($_GET['recipient']);
        $course = checkValues($_GET['course']);
        $type = checkValues($_GET['type']);
        $send_message = false;

        if(isset($_FILES['image']) && !empty($_FILES['image'])){
            if(empty($_POST['message'])){
                $message = null;
            }else{
                $message = checkValues($_POST['message']);
            }
            $insert_query = mysqli_query($con,"INSERT INTO messages(sender, recipient, message, file_type, message_type, courseID) VALUES ('$sender', '$recipient', '$message','image','$type','$course')");

            if($insert_query){
                $messageID = mysqli_insert_id($con);
                $insert = 0;
                $total = count($_FILES['image']['name']);
                for ($i = 0; $i < $total; $i++) {
                    $fileName = $_FILES['image']['name'][$i];
                    $tmpName = $_FILES['image']['tmp_name'][$i];
                    $fileSize = $_FILES['image']['size'][$i];
                    $folder = 'message-files/';
                    $fileName = addslashes($fileName);
                    if ($_FILES['image']['error'][$i] > 0) {
                        echo 'error';
                        exit();
                    }
                    else {
                        $move = move_uploaded_file($tmpName, $folder . $fileName);
                        if ($move) {

                            $sql_query = mysqli_query($con, "INSERT INTO message_files (messageID, filename) VALUES ('$messageID','$fileName')");
                            if ($sql_query) {
                                if ($i == ($total - 1)) {
                                    $insert = 1;
                                } else {
                                    $insert = 0;
                                }
                            }
                            else {
                                echo 'query error';
                            }

                        }
                        else {
                            echo 'move error';
                        }

                    }

                }

                if($insert == 1){
                    $send_message = true;
                    echo 'success';
                }
                else{
                    echo 'all insert error';
                }
            }
        }

        elseif(isset($_FILES['file']) && !empty($_FILES['file'])){
            if(empty($_POST['message'])){
                $message = null;
            }else{
                $message = checkValues($_POST['message']);
            }
            $fileSize = $_FILES['file']['size'];
            if ($fileSize > 209715200) {
                echo 'large';
                exit();
            }
            $insert_query = mysqli_query($con,"INSERT INTO messages(sender, recipient, message, file_type, courseID, message_type) VALUES ('$sender', '$recipient', '$message','file','$course','$type')");

            if($insert_query){
                $messageID = mysqli_insert_id($con);
                    $fileName = $_FILES['file']['name'];
                    $tmpName = $_FILES['file']['tmp_name'];
                    $folder = 'message-files/';
                    $fileName = addslashes($fileName);
                    if ($_FILES['file']['error'] > 0) {
                        echo 'error';
                        exit();
                    }
                    else {
                        $move = move_uploaded_file($tmpName, $folder . $fileName);
                        if ($move) {

                            $sql_query = mysqli_query($con, "INSERT INTO message_files (messageID, filename) VALUES ('$messageID','$fileName')");
                            if ($sql_query) {
                                $send_message = true;
                                echo 'success';
                            }
                            else {
                                echo 'query error';
                            }

                        }
                        else {
                            echo 'move error';
                        }

                    }

                }
        }
        else{
            $message = checkValues($_GET['message']);
            $insert_query = mysqli_query($con,"INSERT INTO messages(sender, recipient, message, message_type, courseID) VALUES ('$sender', '$recipient', '$message','$type','$course')");
            if($insert_query){
                $send_message = true;
                echo 'success';
            }
            else echo 'error';
        }
    }
else{
        echo $_GET['recipient'];
}
}
else{
    echo ' nothing';
}
mysqli_close($con);