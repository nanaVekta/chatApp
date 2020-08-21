$(document).ready(function(){
    $('#addCourseSchool').on('mouseout',function(){
        var schoolID = $(this).val(), departDiv = $('#departmentDiv');
        $.ajax({
            type: 'get',
            url: 'get-department.php?id='+schoolID,
            beforeSend:function(){
                departDiv.html('<img src="images/btn-ajax-loader.gif" align="center">');
            },
            success:function(data){
                departDiv.html(data);
            },
            error:function(e){
                alert(e+' please check your internet connection and try again');
            }
        });
    });

    $('#addSemesterCourseDepartment').on('mouseout',function(){
        var departmentID = $(this).val(), courseDiv = $('#courseDiv');
        $.ajax({
            type: 'get',
            url: 'get-courses.php?id='+departmentID,
            beforeSend:function(){
                courseDiv.html('<img src="images/btn-ajax-loader.gif" align="center">');
            },
            success:function(data){
                courseDiv.html(data);
            },
            error:function(e){
                alert(e+' please check your internet connection and try again');
            }
        });

        var programmeDiv = $('#programmeDiv');
        $.ajax({
            type: 'get',
            url: 'get-programme.php?id='+departmentID,
            beforeSend:function(){
                programmeDiv.html('<img src="images/btn-ajax-loader.gif" align="center">');
            },
            success:function(data){
                programmeDiv.html(data);
            },
            error:function(e){
                alert(e+' please check your internet connection and try again');
            }
        });


        var lecDiv = $('#lecturerDiv');
        $.ajax({
            type: 'get',
            url: 'get-lecturers.php?id='+departmentID,
            beforeSend:function(){
                lecDiv.html('<img src="images/btn-ajax-loader.gif" align="center">');
            },
            success:function(data){
                lecDiv.html(data);
            },
            error:function(e){
                alert(e+' please check your internet connection and try again');
            }
        })
    });


    var courseForm = $('#addCourseForm');
    courseForm.validate({
        rules:{
            addCourseCode:{
                required: true,
                minlength: 4,
                maxlength: 10
            },
            addCourseName:{
                required: true,
                minlength: 4
            },
            addCourseSchool:{
                required: true
            },
            addCourseDepartment:{
                required: true
            },
            addCourseLevel:{
                required: true
            },
            addCourseSemester:{
                required: true
            },
            addCourseCredit:{
                required: true,
                number: true,
                maxlength: 2
            }
        },
        messages:{
            addCourseCode:{
                required: 'input course code',
                minlength: 'should be more than 4 characters',
                maxlength: 'should be less than 10 characters'
            },
            addCourseName:{
                required: 'input name of course',
                minlength: 'should be more than 4 characters'
            },
            addCourseSchool:{
                required: 'select name of school'
            },
            addCourseDepartment:{
                required: 'select name of department'
            },
            addCourseLevel: 'select level',
            addCourseSemester: 'select semester',
            addCourseCredit:{
                required: 'input credit hour',
                number: 'should be a number',
                maxlength: 'should be less than 400 characters'
            }
        },
        submitHandler: submitCourse
    });
    function submitCourse(){
        var button = $('#addCourseSubmit');
        var errorDiv = $('#addCourseError'), data = courseForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-course.php',
            data: data,
            beforeSend: function () {
                button.html('<span class="fa fa-spin fa-spinner"></span> sending...').attr('disabled,disabled');
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

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;Sorry course already exist in our database!</div>');

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



    var semesterCourseForm = $('#addSemesterCourseForm');
    semesterCourseForm.validate({
        rules:{
            addSemesterCourseName:{
                required: true
            },
            addSemesterCourseLecturer:{
                required: true
            },
            addSemesterCourseDepartment:{
                required: true
            },
            addSemesterCourseLevel:{
                required: true
            },
            addSemesterCourseSemester:{
                required: true
            },
            addStudentProgramme:{
                required: true
            }
        },
        messages:{
            addSemesterCourseName:{
                required: 'select course name'
            },
            addSemesterCourseLecturer:{
                required: 'select name of lecturer'
            },
            addSemesterCourseDepartment:{
                required: 'select name of department'
            },
            addSemesterCourseLevel: 'select level',
            addSemesterCourseSemester: 'select semester',
            addStudentProgramme: 'select programme'
        },
        submitHandler: submitSemesterCourse
    });
    function submitSemesterCourse(){
        var button = $('#addSemesterCourseSubmit');
        var errorDiv = $('#addSemesterCourseError'), data = semesterCourseForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-semester-course.php',
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

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;Sorry course already exist in our database!</div>');

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


    $('.courseYear').on('click',function(){
       var courseID = $(this).attr('id').replace(/courseYear-/,'');
        $('#openCourse-'+courseID).removeClass('disabled');
    });

    $('.openCourse').on('click',function () {
        var courseID = $(this).attr('id').replace(/openCourse-/,'');
        var year = $('#courseYear-'+courseID).val();
        var dashDiv = $('#dashboard');
        dashDiv.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            dashDiv.load('view-course.php?courseId='+courseID+'&year='+year);
        },800);
    })
});