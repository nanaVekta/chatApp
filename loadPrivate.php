<?php session_start();
require_once "includes/dbconfig.php";
include_once "includes/functions.php";


if(!isset($_SESSION['c_lecturer_logged'])){
    echo "SESSION EXPIRED!! RELOAD PAGE";
    exit();
}

if(isset($_GET) && isset($_GET["student"]) && isset($_GET["course"]) && isset($_GET['type']) && isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

    $item_per_page 		= 30; //item to display per page
//continue only if $_POST is set and it is an Ajax request

    $sender = $_SESSION['c_lecturer_logged'];

    $type = checkValues($_GET['type']);
    $courseID = checkValues($_GET['course']);

    $select_course = mysqli_query($con, "SELECT * FROM course WHERE courseID = '$courseID'");
    $courseRow = mysqli_fetch_array($select_course);

    $recipient = checkValues($_GET['student']);

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
    $results = $mysqli = mysqli_query($con, "SELECT COUNT(*) FROM messages WHERE message_type = '$type' AND courseID = '$courseID'");

    if($type == 'private'){
        $results = $mysqli = mysqli_query($con, "SELECT COUNT(*) FROM messages WHERE (sender = '$sender' AND recipient = '$recipient' AND message_type = '$type' AND courseID = '$courseID') OR (sender = '$recipient' AND recipient = '$sender' AND message_type = '$type' AND courseID = '$courseID')");
    }

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

            var div = $('#loadDiv');

            $('#message').on('keyup',function () {
                if($(this).val() != ''){
                    $('#send-message').removeAttr('disabled');
                }
                else{
                    $('#send-message').attr('disabled','disabled');
                }
            });

            var sender = $('#sender').val();
            var recipient = $('#recipient').val();
            var course = $('#courseID').val();
            var type = $('#messageType').val();
            $('#send-message').on('click',function (e) {
                e.preventDefault();

                var button = $('#send-message');
                var form = $('#message-form');

                if($('#attachImage').val() != ''){
                    var formData = new FormData(), file = $('#attachImage');
                    formData.append('sender',sender);
                    formData.append('recipient',recipient);
                    formData.append('course', course);
                    formData.append('type', type);
                    formData.append('message',$('#message').val());


                    var fileList = file[0].files;
                    for(var i = 0; i < fileList.length; i++) {
                        formData.append('image[]', file[0].files[i]);
                    }
                    // prevent default action
                    e.preventDefault();
                    // send ajax request
                    $.ajax({
                        url: 'submit-message.php',
                        type: 'POST',
                        data: formData,
                        contentType: false,
                        cache: false,
                        processData: false,
                        beforeSend: function () {
                            button.html('<span class="fa fa-spin fa-spinner"></span>');
                        },
                        success: function (data) {
                            if(data == 'success'){
                                $('#messages').load('loadAllMessages.php',{sender: sender, recipient: recipient, course: course, type: type}).fadeIn(1800);
                            }
                            else{
                                $('#messages').append('<div class="alert alert-danger" style="float: right"><h4 class="text-center"><span class="fa fa-exclamation-triangle"></span> &nbsp; Error! message not sent</h4> </div>');
                            }
                            button.html('<span class="fa fa-send"></span>');
                            form.trigger('reset');
                            $('#close-div').addClass('hidden');
                            $('#attachImage').val('').removeAttr('disabled');
                            $('#appendMessageAttachment').html('');
                            $('#send-message').attr('disabled','disabled');
                            $('#attachFile').val('').removeAttr('disabled');
                            $('#attachFileLabel').css('cursor','pointer');
                            $('#attachImageLabel').css('cursor','pointer');
                        },
                        error: function () {
                            button.html('<span class="fa fa-send"></span>');
                            $('#messages').prepend('<div class="alert alert-danger"><h3 class="text-center"><span class="fa fa-exclamation-triangle"></span> &nbsp; Error!</h3> </div>')
                        }
                    });
                }
                else if($('#attachFile').val() != ''){
                    var fileData = new FormData(), attachedFile = $('#attachFile');
                    fileData.append('sender',sender);
                    fileData.append('recipient',recipient);
                    fileData.append('course', course);
                    fileData.append('type', type);
                    fileData.append('message',$('#message').val());
                    fileData.append('file', attachedFile[0].files[0]);
                    // prevent default action
                    e.preventDefault();
                    // send ajax request
                    $.ajax({
                        url: 'submit-message.php',
                        type: 'POST',
                        data: fileData,
                        contentType: false,
                        cache: false,
                        processData: false,
                        beforeSend: function () {
                            button.html('<span class="fa fa-spin fa-spinner"></span>');
                        },
                        success: function (data) {
                            if(data == 'success'){
                                $('#messages').load('loadAllMessages.php',{sender: sender, recipient: recipient, course: course, type: type}).fadeIn(1800);
                            }
                            else if(data == 'large'){
                                $('#messages').append('<div class="alert alert-danger" style="float: right"><h4 class="text-center"><span class="fa fa-exclamation-triangle"></span> &nbsp; file too large (max 200MB)</h4> </div>');
                            }
                            else{
                                $('#messages').append('<div class="alert alert-danger" style="float: right"><h4 class="text-center"><span class="fa fa-exclamation-triangle"></span> &nbsp; ; Error! message not sent</h4> </div>');
                            }
                            button.html('<span class="fa fa-send"></span>');
                            form.trigger('reset');
                            $('#close-div').addClass('hidden');
                            $('#attachImage').val('').removeAttr('disabled');
                            $('#appendMessageAttachment').html('');
                            $('#send-message').attr('disabled','disabled');
                            $('#attachFile').val('').removeAttr('disabled');
                            $('#attachFileLabel').css('cursor','pointer');
                            $('#attachImageLabel').css('cursor','pointer');
                        },
                        error: function () {
                            button.html('<span class="fa fa-send"></span>');
                            $('#load-messages').prepend('<div class="alert alert-danger"><h3 class="text-center"><span class="fa fa-exclamation-triangle"></span> &nbsp; Error!</h3> </div>')
                        }
                    });
                }
                else{
                    $.ajax({
                        url: 'submit-message.php',
                        type: 'get',
                        data: form.serialize(),
                        beforeSend: function () {
                            button.html('<span class="fa fa-spin fa-spinner"></span>');
                        },
                        success: function (data) {
                            if(data == 'success'){
                                $.ajax({
                                    url: 'loadAllPrivateMessages.php',
                                    type: 'get',
                                    data: {sender: sender, recipient: recipient, course: course, type: type},
                                    success: function (data) {
                                        $('#messages').html(data).fadeIn(1800);
                                    }
                                });
                            }
                            else{
                                $('#messages').prepend('<div class="alert alert-danger"><h3 class="text-center"><span class="fa fa-exclamation-triangle"></span> &nbsp; '+ data +'</h3> </div>')
                            }
                            button.html('<span class="fa fa-send"></span>');
                            form.trigger('reset');
                        },
                        error: function () {
                            button.html('<span class="fa fa-send"></span>');
                            $('#messages').prepend('<div class="alert alert-danger"><h3 class="text-center"><span class="fa fa-exclamation-triangle"></span> &nbsp; Error!</h3> </div>')
                        }
                    })
                }

            });

            $('#close-div').on('click',function () {
                $(this).addClass('hidden');
                $('#attachImage').val('').removeAttr('disabled');
                $('#appendMessageAttachment').html('');
                $('#send-message').attr('disabled','disabled');
                $('#attachFile').val('').removeAttr('disabled');
                $('#attachFileLabel').css('cursor','pointer');
                $('#attachImageLabel').css('cursor','pointer');
            });

            $('#privateLink').on('click',function () {
                $('#message-loader').removeClass('hidden');
                var courseID = $('#courseID').val();
                setTimeout(function () {
                    $('#message-loader').addClass('hidden');
                    $.ajax({
                        url: 'loadStudents.php',
                        type: 'get',
                        data: {course: courseID},
                        success: function (data) {
                            $('#load-messages').html(data).fadeIn(1800);
                        }
                    });

                },1800);
            });

            $('#broadcastLink').on('click',function () {
                $('#message-loader').removeClass('hidden');
                var courseID = $('#courseID').val();
                var mType = $('#messageType').val();
                setTimeout(function () {
                    $('#message-loader').addClass('hidden');
                    $.ajax({
                        url: 'loadLecturerMessages.php',
                        type: 'get',
                        data: {course: courseID, type: 'broadcast'},
                        success: function (data) {
                            $('#load-messages').html(data).fadeIn(1800);
                        }
                    });

                },1800);
            });

            $('#filesLink').on('click',function () {
                $('#message-loader').removeClass('hidden');
                var courseID = $('#courseID').val();
                var mType = $('#messageType').val();
                setTimeout(function () {
                    $('#message-loader').addClass('hidden');
                    $.ajax({
                        url: 'loadMessages.php',
                        type: 'get',
                        data: {course: courseID, type: mType},
                        success: function (data) {
                            $('#load-messages').html(data).fadeIn(1800);
                        }
                    });

                },1800);
            });

            $('.share-m-btn').on('click', function () {
                var messageID = $(this).attr('id').replace(/share-btn-/,'');
                alert(messageID);
                $.ajax({
                   url: "share-message.php",
                    type: 'get',
                    data: {message: messageID},
                    beforeSend: function () {
                        $('#share-btn-'+messageID).html('<span class="fa fa-spin fa-spinner"></span> sharing...').attr('disabled','disabled');
                    },
                    success: function (data) {
                        alert(data);
                        $('#share-modal-'+messageID).modal().hide();
                        $('.modal-backdrop').hide();
                        $('body').css('overflow','scroll');
                        $('#share-btn-'+messageID).html('<span class="fa fa-check"></span> shared').attr('disabled','disabled');
                    },
                    error: function () {
                        alert('error');
                    }

                });
            });
        } );
    </script>
    <ol class="breadcrumb">
        <li><a href="index.php">Dashboard</a></li>
        <li><a href="#"><?php echo $courseRow['code'] ?></a></li>
        <?php
        if($type == 'private'){
            ?>
            <li><a href="#">Private</a></li>
            <?php
        }
        elseif ($type == 'broadcast'){
            ?>
            <li><a href="#">Broadcast</a></li>
            <?php
        }
        else{
            ?>
            <li><a href="#">Files</a></li>
            <?php
        }
        ?>
    </ol>
    <div class="row">
        <div id="searchHeader" style="z-index: 100; width: inherit;">
            <div class="col-xs-4">
                <a href="#" style="text-decoration: none; color: inherit">
                    <?php
                    if($type == 'private'){
                        ?>
                        <h4 class="text-center col-active" id="privateLink" style="padding: 10px;">
                            <span class="fa fa-user"></span> &nbsp; Private
                        </h4>
                        <?php
                    }
                    else{
                        ?>
                        <h4 class="text-center" id="privateLink" style="padding: 10px;">
                            <span class="fa fa-user"></span> &nbsp; Private
                        </h4>
                        <?php
                    }
                    ?>

                </a>
            </div>
            <div class="col-xs-4">
                <a href="#" style="text-decoration: none; color: inherit">
                    <?php
                    if($type == 'broadcast'){
                        ?>
                        <h4 class="text-center col-active" id="broadcastLink" style="padding: 10px;">
                            <span class="fa fa-users"></span> &nbsp; Broadcast
                        </h4>
                        <?php
                    }
                    else{
                        ?>
                        <h4 class="text-center" id="broadcastLink" style="padding: 10px;">
                            <span class="fa fa-users"></span> &nbsp; Broadcast
                        </h4>
                        <?php
                    }
                    ?>

                </a>
            </div>
            <div class="col-xs-4">
                <a href="" style="text-decoration: none; color: inherit">
                    <?php
                    if($type == 'files'){
                        ?>
                        <h4 class="text-center col-active" id="filesLink" style="padding: 10px;">
                            <span class="fa fa-user"></span> &nbsp; Files
                        </h4>
                        <?php
                    }
                    else{
                        ?>
                        <h4 class="text-center" id="filesLink" style="padding: 10px;">
                            <span class="fa fa-user"></span> &nbsp; Files
                        </h4>

                        <?php
                    }
                    ?>

                </a>
            </div>
        </div>
    </div>

    <nav class="navbar navbar-fixed-bottom navbar-default">
        <div class="container">
            <div class="row">
                <div class="clearfix">
                    <div class="pull-right hidden" id="close-div" style="background-color: rgb(150,150,150); padding: 5px; border-radius: 4px; cursor: pointer">
                        <span class="fa fa-close"></span>
                    </div>
                    <div id="appendMessageAttachment"></div>
                </div>
                <form id="message-form" enctype="multipart/form-data"  style="margin: 10px 0 0 -20px">
                    <div class="col-xs-6">
                        <input type="hidden" name="sender" id="sender" value="<?php echo $sender ?>">
                        <input type="hidden" name="recipient" id="recipient" value="<?php echo $recipient ?>">
                        <input type="hidden" name="course" id="courseID" value="<?php echo $courseID ?>">
                        <input type="hidden" name="type" id="messageType" value="<?php echo $type ?>">
                        <div class="form-group">
                            <textarea class="form-control" style="color: black; height: 35px" name="message" id="message" placeholder="Your message here" cols="50" rows="1" required></textarea>
                        </div>
                    </div>

                    <div class="col-xs-4" style="margin: -10px 0 0 0; cursor: pointer; color: #00CC00">
                        <div class="row">
                            <div class="col-xs-6">
                                <label for="attachImage" id="attachImageLabel" class="h3 text-center">
                                    <span class="fa fa-image" title="attach image"></span>
                                </label>
                                <input type="file" id="attachImage" name="image[]" class="hidden" accept="image/*"  onchange="showMyImage(this)"  multiple/>
                            </div>

                            <div class="col-xs-6">
                                <label for="attachFile" id="attachFileLabel" class="h3 text-center">
                                    <span class="fa fa-paperclip" title="attach file"></span>
                                </label>
                                <input type="file" id="attachFile" name="file" class="hidden" accept="application/*"  onchange="showMyFile()"/>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-2">
                        <button class="btn btn-default center-block" id="send-message" disabled>
                            <span class="fa fa-send"></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </nav>

    <div id="messages">
        <?php
        $results = mysqli_query($con, "SELECT * FROM messages WHERE message_type = '$type' AND courseID = '$courseID' ORDER BY message_time ASC LIMIT $page_position, $item_per_page");

        if($type == 'private'){
            $results = mysqli_query($con, "SELECT * FROM messages WHERE (sender = '$sender' AND recipient = '$recipient' AND message_type = '$type' AND courseID = '$courseID') OR (sender = '$recipient' AND recipient = '$sender' AND message_type = '$type' AND courseID = '$courseID') ORDER BY message_time ASC LIMIT $page_position, $item_per_page");
        }
        $numOfRows = mysqli_num_rows($results);
        if ($numOfRows == 0) {
            echo '<div class="alert alert-info"><h2 class="text-center">No messages</h2></div>';
            exit();
        }

        while($row = mysqli_fetch_array($results)) {
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

//                ?>
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
                if ($row['file_type'] == 'image') {
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
    echo $_POST["course"];
}

mysqli_close($con);