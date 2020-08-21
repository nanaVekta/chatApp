// JavaScript Document

$('document').ready(function()
{
    /* validation of reset form*/
    $("#register-form").validate({
        rules:
        {
            oPassword: {
                required: true,
                minlength: 8,
                maxlength: 40
            },
            nPassword: {
                required: true,
                minlength: 8,
                maxlength: 40
            },
            cPassword: {
                required: true,
                equalTo: '#nPassword'
            }

        },
        messages:
        {
            oPassword:{
            required: "please enter your old password",
            minlength: "password should be at least have 8 characters",
                maxlength: "Password too long. Max 40 characters"
        },

            nPassword:{
              required:"Please enter your new password",
                minlength:"Password should be at least 8 characters",
                maxlength: "Password too long. Max 40 characters"
            },

            cPassword:{
                required: "please retype your password",
                equalTo: "password doesn't match !"
             }

        },
        submitHandler: submitForm
    });


    /* reset form submit */
    function submitForm()
    {


        var data = $("#register-form").serialize();
        var div = $('#showContent');


        $.ajax({

            type : 'get',
            url  : 'reset.php',
            data : data,
            beforeSend: function()
            {
                $("#error").fadeOut();
                $("#btn-submit").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
            },
            success :  function(data)
            {

                if(data=="reset")
                {
                    $("#error").fadeIn(1000, function(){

                        $("#btn-submit").html('<img src="images/btn-ajax-loader.gif" /> &nbsp; Resetting ...');
                    $("#error").html('<div class="alert alert-success"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Password reset successful!</div>');

                        setTimeout(function(){
                            //load profile records
                            div.load( "profileinfo.php");
                        },1800);

                    });
                }

                else if(data=='error'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-ok"></span> &nbsp; Sorry password reset failed, please try again!</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-refresh"></span>&nbsp;Reset');

                    });

                }

                else if(data=='0'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Sorry no account found!</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-refresh"></span>&nbsp;Reset');

                    });

                }

                else if(data=='notSame'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Sorry passwords do not match!</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-refresh"></span>&nbsp;Reset');

                    });

                }

                else if(data=='noData'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please input the fields</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-refresh"></span>&nbsp;Reset');

                    });

                }

                else{

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;'+data+'</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-refresh"></span>&nbsp;Reset');

                    });

                }
            },
            error: function(e){
                alert(e+"<br>check internet connection");
                $("#btn-submit").html('<span class="glyphicon glyphicon-refresh"></span>&nbsp;Reset');
            }
        });
        return false;
    }


    /* validation of deletion form*/
    $("#deleteForm").validate({
        rules:
        {
            deleteReason: {
                required: true,
                minlength: 10,
                maxlength: 400
            }
        },
        messages:
        {
            deleteReason:{
                required: "please enter your reason",
                minlength: "should be at least have 10 characters",
                maxlength: "Maximum of 400 characters"
            }
        },

        submitHandler: submitDeleteForm
    });

    /*delete form submit */
    function submitDeleteForm()
    {

        var data = $("#deleteForm").serialize();

        $.ajax({
            type : 'post',
            url  : 'delete.php',
            data : data,
            beforeSend: function()
            {
                $("#deleteError").fadeOut();
                $("#submitDelete").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
            },
            success :  function(data)
            {

                if(data=="deleted")
                {
                    $("#deleteError").fadeIn(1000, function(){

                        $("#submitDelete").html('<img src="images/btn-ajax-loader.gif" /> &nbsp; Resetting ...');
                        $("#deleteError").html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> &nbsp; Password reset successful!</div>');

                        setTimeout(function(){
                            //load profile records
                            window.location.href = 'home.php'
                        },1800);

                    });
                }

                else if(data=='undeleted'){
                    $("#deleteError").fadeIn(1000, function(){

                        $("#deleteError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-ok"></span> &nbsp; Sorry password reset failed, please try again!</div>');

                        $("#submitDelete").html('<span class="glyphicon glyphicon-trash"></span> Delete');

                    });

                }

                else if(data=='0'){
                    $("#deleteError").fadeIn(1000, function(){

                        $("#deleteError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Sorry no account found!</div>');

                        $("#submitDelete").html('<span class="glyphicon glyphicon-trash"></span> Delete');

                    });

                }

                else if(data=='notSame'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Sorry passwords do not match!</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-refresh"></span>&nbsp;Reset');

                    });

                }

                else if(data=='noData'){
                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please input the fields</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-refresh"></span>&nbsp;Reset');

                    });

                }

                else{

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;'+data+'</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-refresh"></span>&nbsp;Reset');

                    });

                }
            },
            error: function(e){
                alert(e+"<br>check internet connection");
                $("#btn-submit").html('<span class="glyphicon glyphicon-refresh"></span>&nbsp;Reset');
            }
        });
        return false;
    }

});


