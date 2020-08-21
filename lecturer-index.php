<?php session_start();
require_once 'includes/dbconfig.php';
include_once 'includes/functions.php';

if(!isset($_SESSION['c_lecturer_logged'])){
    redirect_to('staff-login.php');
}

$id = $_SESSION['c_lecturer_logged'];


$personal_query = mysqli_query($con, "SELECT * FROM lecturer_personal_info WHERE lecturerID = '$id'");
$personalRow = mysqli_fetch_array($personal_query);

$pic_query = mysqli_query($con, "SELECT * FROM lecturer_picture WHERE lecturerID = '$id'");
$picRow = mysqli_fetch_array($pic_query);


$academic_query = mysqli_query($con, "SELECT * FROM lecturer_academic_info WHERE lecturerID = '$id'");
$academicRow = mysqli_fetch_array($academic_query);


?>

<!DOCTYPE html>

<html lang="en">

<head>
    <title><?php  echo $personalRow['first_name']?> | Chat App | Lecturer Dashboard</title>
    <meta charset="UFT-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="authors" content="Julius Asante, Alfred Kubinson">
    <link rel="icon"  type="image/png" href="images/uenr.png">
    <link href="css/bootstrap.css" rel="stylesheet" media="all" type="text/css">
    <link rel="stylesheet" media="all" type="text/css" href="css/style.css">
    <link href="fontawesome/css/font-awesome.css" rel="stylesheet" media="all" type="text/css">
    <link href="css/fileinput.css" rel="stylesheet" media="all" type="text/css">
    <link href="css/jquery-ui.css" rel="stylesheet" media="all" type="text/css">
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.js"></script>
    <script type="text/javascript" src="js/fileinput.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/lecturer-index.js"></script>
    <script type="text/javascript" src="js/validation.min.js"></script>
    <script type="text/javascript" src="js/moment.js"></script>
    <script type="text/javascript" src="js/moment.min.js"></script>
    <script type="text/javascript" src="js/Chart.js"></script>
</head>

<body style='padding: 50px 0 50px 0; background: url("images/bg.jpg")' >

<nav class="navbar  navbar-fixed-top">
    <div style="margin: 5px 0 0 20px; width: 5%" class="navbar-left pull-left">
        <img src="images/uenr.png" height="40">
    </div>

    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
    </div>

    <div class="navbar-collapse collapse" id="nav">

        <div class="navbar-right" style="margin: 0 20px 0 0">
            <img class="img-circle" src="lecturers/<?php echo $picRow['file_name'] ?>" height="50">

            <span style="color: whitesmoke; margin: 15px 25px 0 0"><?php echo $personalRow['title'].' '.$personalRow['first_name'] ?></span>
            <a role="button" class="btn btn-danger" title="logout" href="logout.php?page=index">
                <i class="fa fa-power-off"></i>
            </a>
        </div>
    </div>
</nav>

<div class="container">
    <div class="row">
        <div class="col-sm-3">
            <img src="lecturers/<?php echo $picRow['file_name'] ?>" class="img-thumbnail img-responsive" alt="<?php echo $personalRow['first_name'] ?>">
            <hr>
            <div class="row">
                <div class="col-xs-5"><strong>Lecturer ID</strong></div>
                <div class="col-xs-7"><?php echo $personalRow['lecturerID'] ?></div>
            </div>
            <hr>
            <div class="row">
                <div class="col-xs-5"><strong>Name</strong></div>
                <div class="col-xs-7"><?php echo $personalRow['title'].' '.$personalRow['first_name'].' '.$personalRow['middle_name'].' '.$personalRow['last_name'] ?></div>
            </div>
            <hr>
            <h2 class="text-center">Semester Courses</h2>
            <?php

            $course_query = mysqli_query($con,"SELECT * FROM semester_course WHERE lecturerID = '$id'");
            $numOfCourses = mysqli_num_rows($course_query);
            if($numOfCourses <= 0){
                echo '<p class="text-center text-danger">Sorry, you have no courses this semester</p>';
            }
            else {

                while ($courseRow = mysqli_fetch_array($course_query)) {
                            $courseID = $courseRow['courseID'];
                            $c_query = mysqli_query($con, "SELECT * FROM course WHERE courseID = '$courseID'");
                            $cRow = mysqli_fetch_array($c_query);
                            ?>
                    <hr>
                    <div class="row">
                        <div class="col-sm-7">
                            <p><?php echo $cRow['code'] ?></p>
                        </div>
                        <div class="col-sm-5">
                            <div class="center-block">
                                <button class="btn btn-success join-chat" id="course-<?php echo $courseID ?>">
                                    <span class="fa fa-comment"></span> Join Chat
                                </button>
                            </div>
                        </div>
                    </div>
                            <?php
                        }

            }

            ?>

        </div>

        <div class="col-sm-9" id="dashboard">
            <h4 class="text-center hidden" style="margin-top: 60px; color: #00CC00" id="message-loader">
                <span class="fa fa-spin fa-circle-o-notch"></span> Loading...
            </h4>
            <div id="load-messages">
                <!-- messages will be loaded here -->

            </div>

        </div>
    </div>
</div>


</body>

</html>