<?php session_start();
require_once 'includes/dbconfig.php';
include_once 'includes/functions.php';

if(isset( $_SERVER['HTTP_X_REQUESTED_WITH'] )) {
    if (!empty($_GET['index_number']) && !empty($_GET['password'])) {
        $index_number = $_GET['index_number'];
        $password = $_GET['password'];

        $stmt = mysqli_query($con, "SELECT * FROM student_academic_info WHERE index_number='$index_number' AND student_password = '$password'");
        $count = mysqli_num_rows($stmt);
        $row = mysqli_fetch_array($stmt);

        if ($stmt) {
            if ($count <= 0) {
                echo 'combinationError';
            }
            elseif ($count == 1) {
                $_SESSION['c_student_logged'] = $row['s_id'];
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