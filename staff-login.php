
<!DOCTYPE html>

<html lang="en">

<head>
    <title>Lecture Log In | Chat App</title>
    <meta charset="UFT-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="authors" content="Julius Asante, Alfred Kubinson">
    <link rel="icon"  type="image/png" href="images/uenr.png">
    <link rel="stylesheet" media="all" type="text/css" href="css/style.css">
    <link href="css/bootstrap.css" rel="stylesheet" media="all" type="text/css">
    <link href="fontawesome/css/font-awesome.css" rel="stylesheet" media="all" type="text/css">
    <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.js"></script>
    <script type="text/javascript" src="js/validation.min.js"></script>
    <script type="text/javascript" src="js/login.js"></script>
    <script type="text/javascript">
        var lecturerLoginForm = $('#lecturerLoginForm');
        lecturerLoginForm.validate({
            rules:
                {
                    lecturerID: {
                        required: true
                    },

                    lecturerPassword:{
                        required: true,
                        minlength: 8
                    }

                },
            messages:
                {
                    lecturerID:{
                        required: "please provide your ID number"
                    },
                    lecturerPassword:{
                        required: "please enter your password",
                        minlength: "password should be at least 8 characters"
                    }
                },
            submitHandler: submitLecturerLoginForm
        });
        function submitLecturerLoginForm(){
            var data = lecturerLoginForm.serialize();
            var errorDiv = $('#lecturerError');
            var button = $('#lecturerSubmit');
            var buttonHtml = '<span class="glyphicon glyphicon-log-in"></span>&nbsp;Log In';


            $.ajax({
                type : 'get',
                url  : 'submit-lecturer-login.php',
                data : data,
                beforeSend: function()
                {
                    errorDiv.fadeOut();
                    button.html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
                },
                success :  function(data)
                {

                    if(data=="logged") {
                        //change the content of the loginButton
                        button.html('<img src="images/loading.gif" /> &nbsp; Logging In ...');

                        //Redirect to the index page after 5 seconds
                        window.setTimeout(function () {
                            window.location.href = "lecturer-index.php";
                        }, 1800);
                    }

                    else if(data=='combinationError'){
                        //show the loginError div with and change its contents
                        errorDiv.fadeIn(1000, function(){

                            //Change the contents of the loginError div
                            errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; ID number and password combination not recognised, please try again!</div>');

                            //change the content of the loginButton to the original contents
                            button.html(buttonHtml);

                        });

                    }

                    else if(data=='queryError'){

                        errorDiv.fadeIn(1000, function(){

                            errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Oops a query error occurred, please try again later</div>');

                            button.html(buttonHtml);

                        });

                    }

                    else if(data=='noData'){

                        errorDiv.fadeIn(1000, function(){

                            errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Input all fields in the form</div>');

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
    </script>
</head>

<body>
<div id="formDiv">

    <form class="form-signin center-block" id="lecturerLoginForm">
        <h3 class="text-center form-signin-heading">Lecturer's Log-in</h3>

        <hr>

        <div id="lecturerError">

        </div>


        <div class="form-group">
            <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-user"></i> </span>
                <input type="text" class="form-control" id="lecturerID" name="lecturerID" placeholder="Identity Number" required>
            </div>
        </div>


        <div class="form-group">
            <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-key"></i></span>
                <input type="password" class="form-control" id="lecturerPassword" name="lecturerPassword" placeholder="password" required>
            </div>
        </div>


        <hr>

        <button type="submit" name="lecturerSubmit" id="lecturerSubmit" class="btn btn-primary">
            <span class="glyphicon glyphicon-log-in"></span> Log-In
        </button>

        <br><hr>
        <p><a href="login.php">Click here</a> to log in as student</p>
    </form>

</div>

</body>
</html>

