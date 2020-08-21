<?php session_start();
require_once 'includes/dbconfig.php';
include_once 'includes/functions.php';

if(!isset($_SESSION['c_student_logged'])){
    redirect_to('student-login.php');
    exit();
}

$id = $_SESSION['c_student_logged'];


$personal_query = mysqli_query($con, "SELECT * FROM student_personal_info WHERE s_id = '$id'");
$personalRow = mysqli_fetch_array($personal_query);

$pic_query = mysqli_query($con, "SELECT * FROM student_picture WHERE s_id = '$id'");
$picRow = mysqli_fetch_array($pic_query);


$academic_query = mysqli_query($con, "SELECT * FROM student_academic_info WHERE s_id = '$id'");
$academicRow = mysqli_fetch_array($academic_query);
$index_num = $academicRow['index_number'];
$year = date('Y',time());

$reg_course_query = mysqli_query($con, "SELECT * FROM registered_course WHERE s_id = '$id'");
$numOfRegCourse = mysqli_num_rows($reg_course_query);



?>

<!DOCTYPE html>

<html lang="en">

<head>
    <title><?php  echo $academicRow['index_number']?> | Chat App | Dashboard</title>
    <meta charset="UFT-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="authors" content="Pesewa Websoft">
    <meta name="description" content="Real-time chatting between lecturers and students"/>
    <link rel="icon"  type="image/png" href="images/uenr.png">
    <link rel="stylesheet" media="all" type="text/css" href="css/style.css">
    <link href="css/bootstrap.css" rel="stylesheet" media="all" type="text/css">
    <link href="fontawesome/css/font-awesome.css" rel="stylesheet" media="all" type="text/css">
    <link href="css/fileinput.css" rel="stylesheet" media="all" type="text/css">
    <link href="css/jquery-ui.css" rel="stylesheet" media="all" type="text/css">
    <link href="css/swipebox.css" rel="stylesheet" media="all" type="text/css">
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.js"></script>
    <script type="text/javascript" src="js/fileinput.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/student-index.js"></script>
    <script type="text/javascript" src="js/validation.min.js"></script>
    <script type="text/javascript" src="js/moment.js"></script>
    <script type="text/javascript" src="js/moment.min.js"></script>
    <script type="text/javascript" src="js/Chart.js"></script>
</head>

<body style='padding: 50px 0 50px 0; margin-bottom: 50px; background: url("images/bg.jpg")'>

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
            <img class="img-circle" src="gallery/<?php echo $picRow['filename'] ?>" height="50">

            <span style="color: whitesmoke; margin: 15px 25px 0 0"><?php echo $academicRow['index_number'] ?></span>
            <a role="button" class="btn btn-danger" title="logout" href="logout.php?page=index">
                <i class="fa fa-power-off"></i>
            </a>
        </div>
    </div>
</nav>

<div class="container">
    <div class="row" id="show-results-div">
        <div class="col-sm-3">
            <img src="gallery/<?php echo $picRow['filename'] ?>" class="img-thumbnail img-responsive" alt="<?php echo $personalRow['first_name'] ?>">

            <div class="row">
                <div class="col-xs-7"><strong>Index Number</strong></div>
                <div class="col-xs-5"><?php echo $academicRow['index_number'] ?></div>
            </div>

            <?php
            if($numOfRegCourse == 0){
                ?>
                <div class="alert alert-info">
                    <h2 class="text-center">You haven't registered for any course</h2>
                </div>
            <?php
            }
            else{
                ?>
                <hr>
                <h4 class="text-center" ><b>Registered courses</b></h4>
            <?php
                while($reg_courseRow = mysqli_fetch_array($reg_course_query)){
                    $course_id = $reg_courseRow['courseID'];
                    $select_course = mysqli_query($con, "SELECT * FROM course WHERE courseID = '$course_id'");
                    $courseRow = mysqli_fetch_array($select_course);
                    ?>
                    <hr>
            <div class="row">
                <div class="col-sm-7">
                    <p><?php echo $courseRow['code'] ?></p>
                </div>
                <div class="col-sm-5">
                    <div class="center-block">
                        <button class="btn btn-success join-chat" id="course-<?php echo $course_id ?>">
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