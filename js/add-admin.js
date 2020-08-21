$(document).ready(function () {
    var adminForm = $('#addAdminForm');
    adminForm.validate({
        rules:{
            addAdminFullName:{
                required: true,
                minlength: 4
            },
            addAdminUsername:{
                required: true,
                minlength: 4
            },
            addAdminPassword:{
                required: true,
                minlength: 8
            },
            confirmAdminPassword:{
                required: true,
                minlength: 8,
                equalTo: '#addAdminPassword'
            },
            addAdminEmail:{
                required: true,
                email: true
            },
            addAdminRole:{
                required: true
            }
        },
        messages:{
            addAdminFullName:{
                required: 'input full name',
                minlength: 'should be more than 4 characters'
            },
            addAdminUsername:{
                required: 'input username',
                minlength: 'should be more than 4 characters'
            },
            addAdminPassword:{
                required: 'input password',
                minlength: 'should be more tha 8 characters'
            },
            confirmAdminPassword:{
                required: 'input password',
                minlength: 'should be more tha 8 characters',
                equalTo: 'password should match'
            },
            addAdminEmail: 'input a valid email',
            addAdminRole: 'select level'
        },
        submitHandler: submitAdmin
    });
    function submitAdmin(){
        var button = $('#addAdminSubmit');
        var errorDiv = $('#addAdminError'), data = adminForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-admin.php',
            data: data,
            beforeSend: function () {
                button.html('<span class="fa fa-spin fa-spinner"></span> sending...').attr('disabled,disabled');
                errorDiv.fadeOut();
            },

            success :  function(data) {
                if(data=="inserted") {
                    errorDiv.html('');
                    errorDiv.fadeIn(1000, function(){
                        errorDiv.html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Info inserted successfully.</div>');
                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');
                    });
                }

                else if(data=='notInserted'){
                    errorDiv.html('');

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Could not insert data, please try again later!</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }

                else if(data=='noData'){
                    errorDiv.html('');

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please input all form fields</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }

                else if(data=='exist'){
                    errorDiv.html('');

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;Sorry username or email already exist in our database!</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }

                else if(data=='comError'){
                    errorDiv.html('');

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;Password do not match!</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }

                else if(data=='error'){

                    errorDiv.html('');

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please use the right approach</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }

                else{
                    errorDiv.html('');

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Oops an error occurred. Please try again later</div>');

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

    $('#addAuthorityRole').on('mouseout',function () {
        var value = $(this).val();
        $('#loader').show().removeClass('hidden');
        window.setTimeout(function () {
            if(value == 'Dean'){
                $('#schoolDiv').removeClass('hidden');
                $('#departDiv').addClass('hidden');
            }
            else if(value == 'HOD'){
                $('#schoolDiv').addClass('hidden');
                $('#departDiv').removeClass('hidden');
            }
        },800);
        $('#loader').hide().addClass('hidden');
    });

    $('#addAuthorityDepartment').on('mouseover',function () {
       var departId = $(this).val(), lecturerDiv = $('#loadLecturer');
        $.ajax({
            type: 'get',
            url: 'get-lecturers.php?id='+departId,
            beforeSend: function () {
                lecturerDiv.html('<span class="fa fa-spin fa-spinner center-block"></span> please wait...')
            },
            success: function (data) {
                lecturerDiv.html(data);
            },
            error: function (e) {
               alert(e+' please check connection');
            }
        });
    });

    $('#addAuthoritySchool').on('mouseover',function () {
        var schoolId = $(this).val(), lecturerDiv = $('#loadLecturer');
        $.ajax({
            type: 'get',
            url: 'get-lecturers-with-school.php?id='+schoolId,
            beforeSend: function () {
                lecturerDiv.html('<span class="fa fa-spin fa-spinner center-block"></span> please wait...')
            },
            success: function (data) {
                lecturerDiv.html(data);
            },
            error: function (e) {
                alert(e+' please check connection');
            }
        });
    });

    var authorityForm = $('#addAuthorityForm');
    authorityForm.validate({
        rules:{
            addAuthorityRole:{
                required: true,
            },
            addAuthoritySchool:{
                required: true
            },
            addAuthorityDepartment:{
                required: true
            },
            addSemesterCourseLecturer:{
                required: true
            }
        },
        messages:{
            addAuthorityRole:{
                required: 'select role'
            },
            addAuthoritySchool:{
                required: 'select school'
            },
            addAuthorityDepartment:{
                required: 'select department'
            },
            addSemesterCourseLecturer:{
                required: 'select lecturer'
            }
        },
        submitHandler: submitAuthority
    });
    function submitAuthority(){
        var button = $('#addAuthoritySubmit');
        var errorDiv = $('#addAuthorityError'), data = authorityForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-authority.php',
            data: data,
            beforeSend: function () {
                button.html('<span class="fa fa-spin fa-spinner"></span> sending...').attr('disabled,disabled');
                errorDiv.fadeOut();
            },

            success :  function(data) {
                if(data=="inserted") {
                    errorDiv.html('');
                    errorDiv.fadeIn(1000, function(){
                        errorDiv.html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Info inserted successfully.</div>');
                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');
                    });
                }

                else if(data=='notInserted'){
                    errorDiv.html('');

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Could not insert data, please try again later!</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }

                else if(data=='noData'){
                    errorDiv.html('');

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please input all form fields</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }

                else if(data=='exist'){
                    errorDiv.html('');

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;Sorry username or email already exist in our database!</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }


                else if(data=='error'){

                    errorDiv.html('');

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Sorry an error occurred. Please try again later</div>');

                        button.html('<span class="fa fa-plus-circle"></span> Add').removeAttr('disabled');

                    });

                }

                else{
                    errorDiv.html('');

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+data+'</div>');

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