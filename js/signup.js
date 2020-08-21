$(document).ready(function(){
    var signUpForm = $('#adminSignUp');
    signUpForm.validate({
        rules:
        {
            adminSignUpFullName: {
                required: true,
                minlength: 5,
                maxlength: 80
            },
            adminSignUpUsername: {
                required: true,
                minlength: 5,
                maxlength: 80
            },
            adminSignUpEmail: {
                required: true,
                email: true
            },
            adminSignUpPassword:{
                required: true,
                minlength: 8
            },
            adminSignUpPasswordConfirm:{
                required: true,
                equalTo: '#adminSignUpPassword'
            },
            authPassword:{
                required: true
            }

        },
        messages:
        {

            adminSignUpFullName:{
                required: "please provide your full name",
                minlength: "name should be at least have 5 characters",
                maxlength: "name should be at most have 80 characters"
            },
            adminSignUpUsername:{
                required: "please provide your username",
                minlength: "username should be at least have 5 characters",
                maxlength: "username should be at most have 80 characters"
            },
            adminSignUpEmail: "please enter a valid email address",
            adminSignUpPassword:{
                required: "please enter your password",
                minlength: "password should be at least 8 characters"
            },
            adminSignUpPasswordConfirm:{
                required: "please re-enter your password",
                equalTo: "password do not match"
            },
            authPassword:{
                required: "please enter authentication password"
            }
        },
        submitHandler: submitSignUpForm
    });

    function submitSignUpForm() {
        var button = $('#adminSignUpSubmit');
        var errorDiv = $('#adminSignUpError'), data = signUpForm.serialize();

        $.ajax({
            type: 'get',
            url: 'sign-up.php',
            data: data,
            beforeSend: function () {
                button.html('<img src="images/loading.gif">&nbsp; sending').attr('disabled,disabled');
                errorDiv.fadeOut();
            },

            success :  function(data) {
                if(data=="registered") {
                    //show signUpError div after 1 second
                    errorDiv.fadeIn(1000, function(){
                        //shows the user a success message
                        errorDiv.html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Registration successful. Please Wait.</div>');
                        //changes the content of the signUpButton to the original content
                        button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');
                        window.setTimeout(function(){
                            window.location.href = 'admin.php';
                        },1000)
                    });
                }

                else if(data=='notInserted'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Could not insert data, please try again later!</div>');

                        button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');

                    });

                }

                else if(data=='emailExist'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Sorry your email is already linked to an account!</div>');

                        button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');

                    });

                }

                else if(data=='authError'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Authentication password incorrect. Please contact the administrator!</div>');

                        button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');

                    });

                }

                else if(data=='nameExist'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Oops, username has already being picked!</div>');

                        button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');

                    });

                }

                else if(data=='notSame'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Passwords do not match</div>');

                        button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');

                    });

                }

                else if(data=='noData'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Input all fields in the form</div>');

                        button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');

                    });

                }

                else if(data=='error'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please use the right approach</div>');

                        button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');

                    });

                }

                else{

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Oops an error occurred please try again later</div>');

                        button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');

                    });

                }
            },
            error: function(){
                errorDiv.fadeIn(1000, function () {
                    button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');
                    errorDiv.html('<div class="alert alert-danger"><i class="glyphicon glyphicon-info-sign"></i>Please check your connection and try again later</div>')
                })
            }
        });

        return false;
    }
});

