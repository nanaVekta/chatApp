<?php session_start();
require_once "includes/dbconfig.php";
include_once "includes/functions.php";


if(!isset($_SESSION['c_lecturer_logged'])){
    echo "SESSION EXPIRED!! RELOAD PAGE";
    exit();
}
if(isset($_GET['message'])){
    $messageId = checkValues($_GET['message']);

    $sender = $_SESSION['c_lecturer_logged'];

    $select = mysqli_query($con, "SELECT * FROM messages WHERE messageID = '$messageId'");
    $messageRow = mysqli_fetch_array($select);

    $message = $messageRow['message'];
    $fType = $messageRow['file_type'];
    $courseID = $messageRow['courseID'];

    $insert = mysqli_query($con, "INSERT INTO messages(sender, recipient, message, file_type, message_type, courseID) 
                                                      VALUES ('$sender','all','$message','$fType','broadcast','$courseID')");

    if($insert){
        if($fType != null){
            $select_file = mysqli_query($con,"SELECT * FROM message_files WHERE messageID = '$messageId'");
            $mFRow = mysqli_fetch_array($select_file);
            $filename = $mFRow['filename'];
            $insert_file = mysqli_query($con, "INSERT INTO message_files(messageID, filename) VALUES ('$messageId','$filename')");
            if($insert_file){
                echo "Message shared successfully";
            }
            else{
                echo 'Message file not shared';
            }
    }
    else{
        echo "Message shared successfully";
    }
    }
    else{
        echo 'Message not shared';
    }
}
else{
    echo 'Invalid';
}