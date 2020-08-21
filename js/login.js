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
            type : 'GET',
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
                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Index number and password combination not recognised, please try again!</div>');

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
});