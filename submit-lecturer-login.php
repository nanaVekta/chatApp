<?php session_start();
require_once 'includes/dbconfig.php';
include_once 'includes/functions.php';

if(isset( $_SERVER['HTTP_X_REQUESTED_WITH'] )) {
    if (!empty($_GET['lecturerID']) && !empty($_GET['lecturerPassword'])) {
        $id = $_GET['lecturerID'];
        $password = $_GET['lecturerPassword'];

        $stmt = mysqli_query($con, "SELECT * FROM lecturer_personal_info WHERE lecturerID='$id' AND password = '$password'");
        $count = mysqli_num_rows($stmt);
        $row = mysqli_fetch_array($stmt);

        if ($stmt) {
            if ($count <= 0) {
                echo 'combinationError';
            }
            elseif ($count == 1) {
                $_SESSION['c_lecturer_logged'] = $row['lecturerID'];
                echo "logged";
            }
        }
        else {
            echo "queryError";
        }

    }
    else{
        echo 'noData';
    }
}
else {
    echo "error";
}
?>