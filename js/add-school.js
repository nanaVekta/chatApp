$(document).ready(function(){

    var form = $('#addSchoolForm');

    form.validate({
        rules:
        {
            addSchoolName: {
                required: true,
                minlength: 2,
                maxlength: 100
            },
            addSchoolYear: {
                required: true
            }
        },
        messages:
        {
            addSchoolName:{
                required: "provide name school",
                minlength: "should be at least 2 characters",
                maxlength: "should be at most 100 characters"
            },
            addSchoolYear: "select year of establishment"
        },
        submitHandler: submitSchoolForm
    });

    function submitSchoolForm() {
        var button = $('#addSchoolSubmit');
        var errorDiv = $('#addSchoolError'), data = form.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-school.php',
            data: data,
            beforeSend: function () {
                button.html('<img src="images/loading.gif"> sending...').attr('disabled,disabled');
                errorDiv.fadeOut();
            },

            success :  function(data) {
                if(data=="inserted") {
                    errorDiv.fadeIn(1000, function(){
                        errorDiv.html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Info inserted successfully.</div>');
                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');
                    });
                }

                else if(data=='notInserted'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Could not insert data, please try again later!</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }

                else if(data=='exist'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;Sorry school already exist in our database!</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }

                else if(data=='error'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please use the right approach</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }

                else{

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Oops an error occurred. Please try again later.</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }
            },

            error: function(){
                errorDiv.fadeIn(1000, function () {
                    button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');
                    errorDiv.html('<div class="alert alert-danger"><i class="glyphicon glyphicon-info-sign"></i>Please check your connection and try again later</div>')
                })
            }
        });

        return false;
    }



});
