<?php session_start();
require_once "includes/dbconfig.php";
include_once "includes/functions.php";


if(!isset($_SESSION['c_lecturer_logged'])){
    echo "SESSION EXPIRED!! RELOAD PAGE";
    exit();
}

if(isset($_GET) && isset($_GET['course']) && isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

    $item_per_page 		= 30; //item to display per page
//continue only if $_POST is set and it is an Ajax request

    $courseID = checkValues($_GET['course']);

//Get page number from Ajax POST
    if (isset($_GET["page"])) {
        $page_number = filter_var($_GET["page"], FILTER_SANITIZE_NUMBER_INT, FILTER_FLAG_STRIP_HIGH); //filter number
        if (!is_numeric($page_number)) {
            die('Invalid page number!');
        } //incase of invalid page number
    } else {
        $page_number = 1; //if there's no page number, set it to 1
    }


//get total number of records from database for pagination
    $results = $mysqli = mysqli_query($con, "SELECT COUNT(*) FROM registered_course WHERE courseID = '$courseID'");
    $get_total_rows = mysqli_fetch_row($results); //hold total records in variable


//break records into pages
    $total_pages = ceil($get_total_rows[0] / $item_per_page);

//get starting position to fetch the records
    $page_position = (($page_number - 1) * $item_per_page);


//Limit our results within a specified range.

    ?>
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/jquery.swipebox.js"></script>
    <script>
        $(document).ready( function( $ ) {

           $('.message-student').on('click', function () {
              var studentId = $(this).attr('id').replace(/message-/,'');
              var courseId = $('#scourse-'+studentId).val();

              $('#message-loader').removeClass('hidden');
              setTimeout(function () {
                  $('#message-loader').addClass('hidden');
                  $.ajax({
                     url: 'loadPrivate.php',
                      type: 'get',
                      data:{course: courseId, type: 'private', student: studentId},
                      success: function (data) {
                          $('#load-messages').html(data).fadeIn(1800);
                      }
                  });
              },1800);
           });

        } );
    </script>

    <div>
        <?php
        $select_semester_course = mysqli_query($con, "SELECT * FROM registered_course WHERE courseID = '$courseID'");
        $total = mysqli_num_rows($select_semester_course);

        if ($total == 0) {
            echo '<div class="alert alert-info"><h2 class="text-center">No students found</h2></div>';
            exit();
        }

        while($row = mysqli_fetch_array($select_semester_course)) {
            $sID = $row['s_id'];

            $select_students = mysqli_query($con, "SELECT * FROM student_academic_info WHERE s_id = '$sID'");
            $studentRow = mysqli_fetch_array($select_students);

            ?>
        <hr>
            <div class="row">
                <div class="col-sm-8">
                    <p class="text-center"><?php echo $studentRow['index_number'] ?></p>
                    <input type="hidden" value="<?php echo $courseID ?>" id="scourse-<?php echo $sID ?>">
                </div>
                <div class="col-sm-4">
                    <button class="btn btn-success message-student" id="message-<?php echo $sID ?>">Message</button>
                </div>
            </div>
        <?php

        }


        echo '<input type="hidden" value="'.$total_pages.'" id="total_pages">';
        ?>
    </div>

    <?php
}


mysqli_close($con);