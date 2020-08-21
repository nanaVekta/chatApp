<!DOCTYPE html>
        <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="description" content="Real-time chatting between lecturers and students"/>
            <meta name="author" content="Julius Asante, Alfred Kubinson"/>
            <title>Login Form || Chat App</title>
            <link href="css/bootstrap.css" media="screen" rel="stylesheet" />
            <link href="css/style.css" rel="stylesheet" type="text/css" media="screen">
            <link href="fontawesome/css/font-awesome.css" rel="stylesheet" type="text/css">
            <link rel="icon" href="images/uenr.png">
            <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
            <script src="js/jquery-ui.js"></script>
            <script type="text/javascript" src="js/validation.min.js"></script>
            <script type="text/javascript" src="js/login.js"></script>
            <script type="text/javascript">
                $(document).ready(function(){
                    var studentLoginForm = $('#studentLoginForm');
                    studentLoginForm.validate({
                        rules:
                            {
                                index_number: {
                                    required: true,
                                    minlength: 5,
                                    maxlength: 20
                                },

                                password:{
                                    required: true,
                                    minlength: 8
                                }

                            },
                        messages:
                            {
                                index_number:{
                                    required: "please provide your index number",
                                    minlength: "username should be at least have 5 characters",
                                    maxlength: "username should be at most have 20 characters"
                                },
                                password:{
                                    required: "please enter your password",
                                    minlength: "password should be at least 8 characters"
                                }
                            },
                        submitHandler: submitStudentLoginForm
                    });
                    function submitStudentLoginForm(){
                        var data = studentLoginForm.serialize();
                        var errorDiv = $('#studentError');
                        var button = $('#studentSubmit');
                        var buttonHtml = '<span class="glyphicon glyphicon-log-in"></span>&nbsp;Log In';


                        $.ajax({
                            type : 'post',
                            url  : 'submit-student-login.php',
                            data : data,
                            beforeSend: function()
                            {
                                //hide error div and change the content inside the Button
                                errorDiv.fadeOut();
                                button.html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; authenticating...');
                            },
                            success :  function(data)
                            {

                                if(data=="logged") {
                                    //change the content of the loginButton
                                    button.html('<span class="fa fa-spin fa-spinner"></span> &nbsp; Logging In ...');

                                    //Redirect to the index page after 5 seconds
                                    window.setTimeout(function () {
                                        window.location.href = "index.php";
                                    }, 1800);
                                }

                                else if(data=='combinationError'){
                                    //show the loginError div with and change its contents
                                    errorDiv.fadeIn(1000, function(){

                                        //Change the contents of the loginError div
                                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Index number and password combination not recognised, please try again!</div>');

                                        //change the content of the loginButton to the original contents
                                        button.html(buttonHtml);

                                    });

                                }

                                else if(data=='queryError'){

                                    errorDiv.fadeIn(1000, function(){

                                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Sorry a query error occurred, please try again later</div>');

                                        button.html(buttonHtml);

                                    });

                                }

                                else if(data=='noData'){

                                    errorDiv.fadeIn(1000, function(){

                                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Input all form fields</div>');

                                        button.html(buttonHtml);

                                    });

                                }

                                else if(data=='error'){

                                    errorDiv.fadeIn(1000, function(){

                                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please use the right approach</div>');

                                        button.html(buttonHtml);

                                    });

                                }

                                else{

                                    errorDiv.fadeIn(1000, function(){

                                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Oops an error occurred please try again later</div>');

                                        button.html(buttonHtml);

                                    });

                                }
                            }
                        });
                        return false;
                    }

                });
            </script>

        </head>

        <body style='background: url("images/bg.jpg")'>

        <div id="clear"></div>

        <br><br>

        <div class="signin-form ">

            <div class=" center-block">

                <form class="form-signin center-block" method="get" id="studentLoginForm">

                    <h2 class="form-signin-heading">Log In</h2>
                    <hr/>

                    <div id="studentError">
                        <!-- error will be shown here ! -->
                    </div>

                    <?php
                    if(isset($_GET['logout'])){
                        ?>
                        <input type="hidden" name="page" id="page" value="<?php echo $_GET['logout'] ?>">
                        <?php
                    }
                    else{
                        ?>
                        <input type="hidden" name="page" id="page" value="index.php">
                        <?php
                    }
                    ?>

<div class="form-group">
    <div class="input-group">
        <span class="input-group-addon"><i class="fa fa-user"></i> </span>
        <input type="text" class="form-control" placeholder="Index Number" name="index_number" id="index_number"/>
    </div>
</div>

<div class="form-group">
    <div class="input-group">
        <span class="input-group-addon"><i class="fa fa-key"></i> </span>
        <input type="password" class="form-control" placeholder="Password" name="password" id="password"/>
    </div>
</div>

   <a href="staff-login.php">Lecturer Login</a>

<hr/>

<div class="form-group">
    <button type="submit" class="btn btn-default" name="btn-save" id="studentSubmit">
        <span class="glyphicon glyphicon-log-in"></span>&nbsp;Log In
    </button>
</div>

</form>

</div>

</div>
<br><br>

<div align="center" style="color: green">&copy; Copyright Chat App <?php echo date('Y',time()) ?> </div>

</body>
<div id="clear"></div>
<br>

</html>


