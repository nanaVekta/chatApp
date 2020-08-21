<?php session_start();
require_once "includes/dbconfig.php";
include_once "includes/functions.php";


if(!isset($_SESSION['c_lecturer_logged'])){
    echo "SESSION EXPIRED!! RELOAD PAGE";
    exit();
}

if(isset($_GET) && isset($_GET['sender']) && isset($_GET['recipient']) && isset($_GET['course']) && isset($_GET['type']) && isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

    $item_per_page 		= 30; //item to display per page
//continue only if $_POST is set and it is an Ajax request

    $sender = checkValues($_GET['sender']);

    $type = checkValues($_GET['type']);
    $courseID = checkValues($_GET['course']);
    $recipient = checkValues($_GET['recipient']);
    $select_semester_course = mysqli_query($con, "SELECT * FROM semester_course WHERE courseID = '$courseID'");
    $semRow = mysqli_fetch_array($select_semester_course);

    $select_course = mysqli_query($con, "SELECT * FROM course WHERE courseID = '$courseID'");
    $courseRow = mysqli_fetch_array($select_course);


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
    $results = $mysqli = mysqli_query($con, "SELECT COUNT(*) FROM messages WHERE (sender = '$sender' AND recipient = '$recipient' AND message_type = '$type' AND courseID = '$courseID') OR (sender = '$recipient' AND recipient = '$sender' AND message_type = '$type' AND courseID = '$courseID')");
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

            $( '.initiate-swipe' ).click( function(e) {
                var mId = $(this).attr('id').replace(/swipe-/,'');
                var i = $(this).attr('alt').replace(/image-/,'');

                /*for( var i = 0; i < total; i++){
                 var image = new Array(total);
                 image[i] = $('.swipe-class-'+i+'-'+mId).attr('src');
                 }*/

                $.swipebox(imgs(mId,i));
                e.preventDefault();
            });

            function imgs(id,start) {
                var total = $('#num-'+id).val();
                var arr = [];

                for( var i = start; i < total; i++){
                    var obj = {};
                    obj['href'] = $('.swipe-class-'+i+'-'+id).attr('src');
                    arr.push(obj);
                }

                return arr;
            }

            $(document).scrollTop($(document).height());
        } );
        
    </script>

    <div>
        <?php
        $results = mysqli_query($con, "SELECT * FROM messages WHERE (sender = '$sender' AND recipient = '$recipient' AND message_type = '$type' AND courseID = '$courseID') OR (sender = '$recipient' AND recipient = '$sender' AND message_type = '$type' AND courseID = '$courseID') ORDER BY message_time ASC LIMIT $page_position, $item_per_page");
        $numOfRows = mysqli_num_rows($results);
        if ($numOfRows == 0) {
            echo '<div class="alert alert-info"><h2 class="text-center">No messages</h2></div>';
            exit();
        }

        while($row = mysqli_fetch_array($results)) {
            ?>
            <div class="modal fade" id="share-modal-<?php echo $row['messageID'] ?>" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button class="close" data-dismiss="modal"><span class="fa fa-close"></span></button>
                            <h3 class="modal-title text-center" style='background-color:transparent; color: black;'>Broadcast Message</h3>
                        </div>

                        <div class="modal-body">
                            <p>Do you wish to share this message to all students?</p>
                        </div>

                        <div class="modal-footer">
                            <div class="clearfix">
                                <button type="button" class="btn btn-danger pull-left" data-dismiss="modal">
                                    <span class="fa fa-close"></span> Close
                                </button>

                                <button type="button" class="btn btn-primary pull-right share-m-btn" id="share-btn-<?php echo $row['messageID'] ?>">
                                    <span class="fa fa-share"></span> Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <?php
            if ($sender == $row['sender']) {
                if ($row['file_type'] == 'image') {
                    if ($row['message'] != null) {
                        ?>
                        <div style="width: 80%; float: right">
                            <div class="sent">
                                <p style="font-size: 120%"><?php echo $row['message'] ?></p>

                                <p style="font-size: 50%; color: gray"><?php echo $row['message_time'] ?></p>
                            </div>
                        </div>
                        <?php
                    }
                    $mid = $row['messageID'];
                    $image_query = mysqli_query($con, "SELECT * FROM message_files WHERE messageID = '$mid'");
                    $numOfPics = mysqli_num_rows($image_query);
                    $i = 0;
                    while ($image_row = mysqli_fetch_array($image_query)) {
                        ?>
                        <div style="width: 80%; float: right">
                            <div class="sent">
                                <input type="hidden" value="<?php echo $numOfPics ?>"
                                       id="num-<?php echo $image_row['messageID'] ?>">

                                <img src="message-files/<?php echo $image_row['filename'] ?>" alt="image-<?php echo $i ?>"
                                     class="img-responsive initiate-swipe swipe-class-<?php echo $i ?>-<?php echo $image_row['messageID'] ?>"
                                     id="swipe-<?php echo $image_row['messageID'] ?>">

                                <p style="font-size: 50%; color: gray"><?php echo $row['message_time'] ?></p>
                            </div>
                        </div>
                        <?php
                        $i++;
                    }
                }
                elseif ($row['file_type'] == 'file') {
                    if ($row['message'] != null) {
                        ?>
                        <div style="width: 80%; float: right">
                            <div class="sent">
                                <p style="font-size: 120%"><?php echo $row['message'] ?></p>

                                <p style="font-size: 50%; color: gray"><?php echo $row['message_time'] ?></p>
                            </div>
                        </div>
                        <?php
                    }
                    $mid = $row['messageID'];
                    $file_query = mysqli_query($con, "SELECT * FROM message_files WHERE messageID = '$mid'");
                    $i = 0;
                    while ($file_row = mysqli_fetch_array($file_query)) {
                        ?>
                        <div style="width: 80%; float: right">
                            <div class="sent">
                                <p style="font-size: 120%"><span class="fa fa-file"></span> &nbsp; <?php echo $file_row['filename'] ?></p>
                                <p style="font-size: 50%; color: gray"><?php echo $row['message_time'] ?></p>
                            </div>
                        </div>
                        <?php
                        $i++;
                    }
                }

                else {
                    ?>
                    <div style="width: 80%; float: right">
                        <div class="sent">
                            <p style="font-size: 120%"><?php echo $row['message'] ?></p>

                            <p style="font-size: 50%; color: gray"><?php echo $row['message_time'] ?></p>
                        </div>
                    </div>
                    <?php
                }
            }
            elseif ($sender == $row['recipient']){

                if ($row['file_type'] == 'image') {
                    if ($row['message'] != null) {
                        ?>
                        <div style="width: 80%; float: left">
                            <div class="received">
                                <p style="font-size: 120%"><?php echo $row['message'] ?></p>
                                <p style="font-size: 50%; color: gray"><?php echo $row['message_time'] ?></p>
                            </div>
                            <div class="share" id="share-msg-<?php echo $row['messageID']?>">
                                <h4 style="cursor: pointer" title="share">
                                    <span class="fa fa-share"></span>
                                </h4>
                            </div>
                        </div>
                        <?php
                    }
                    $mid = $row['messageID'];
                    $image_query = mysqli_query($con, "SELECT * FROM message_files WHERE messageID = '$mid'");
                    $numOfPics = mysqli_num_rows($image_query);
                    $i = 0;
                    while ($image_row = mysqli_fetch_array($image_query)) {
                        ?>
                        <div style="width: 80%; float: left">
                            <div class="received">
                                <input type="hidden" value="<?php echo $numOfPics ?>"
                                       id="num-<?php echo $image_row['messageID'] ?>">

                                <img src="message-files/<?php echo $image_row['filename'] ?>" alt="image-<?php echo $i ?>"
                                     class="img-responsive initiate-swipe swipe-class-<?php echo $i ?>-<?php echo $image_row['messageID'] ?>"
                                     id="swipe-<?php echo $image_row['messageID'] ?>">

                                <p style="font-size: 50%; color: gray"><?php echo $row['message_time'] ?></p>
                            </div>
                        </div>
                        <?php
                        $i++;
                    }
                }
                elseif ($row['file_type'] == 'file') {
                    if ($row['message'] != null) {
                        ?>
                        <div style="width: 80%; float: left">
                            <div class="received">
                                <p style="font-size: 120%"><?php echo $row['message'] ?></p>
                                <p style="font-size: 50%; color: gray"><?php echo $row['message_time'] ?></p>
                            </div>
                        </div>
                        <?php
                    }
                    $mid = $row['messageID'];
                    $file_query = mysqli_query($con, "SELECT * FROM message_files WHERE messageID = '$mid'");
                    $i = 0;
                    while ($file_row = mysqli_fetch_array($file_query)) {
                        ?>
                        <div style="width: 80%; float: left">
                            <div class="received clearfix">
                                <div class="pull-left">
                                    <p style="font-size: 120%"><span class="fa fa-file"></span> &nbsp; <?php echo $file_row['filename'] ?></p>
                                    <p style="font-size: 50%; color: gray"><?php echo $row['message_time'] ?></p>
                                </div>
                                <div class="pull-right" style="padding: 10px">
                                    <a href="message-download.php?id=<?php echo base64_encode($file_row['m_file_id'])?>" target="_blank">
                                        <span  class="glyphicon glyphicon-download"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <?php
                        $i++;
                    }
                }

                else {
                    ?>
                    <div style="width: 80%; float: left">
                        <div class="received">
                            <p style="font-size: 120%"><?php echo $row['message'] ?></p>
                            <p style="font-size: 50%; color: gray"><?php echo $row['message_time'] ?></p>
                        </div>
                        <div class="share" id="share-msg-<?php echo $row['messageID']?>">
                            <h4 style="cursor: pointer" title="share to all" data-toggle="modal" data-target="#share-modal-<?php echo $row['messageID'] ?>">
                                <span class="fa fa-share"></span>
                            </h4>
                        </div>
                    </div>
                    <?php
                }
            }

        }


        echo '<input type="hidden" value="'.$total_pages.'" id="total_pages">';
        ?>
    </div>

    <?php
}

else{
    echo $_GET['sender'];
}

mysqli_close($con);