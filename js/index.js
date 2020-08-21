$(document).ready(function(){
    var div = $('#dashboard');

    $('#addStudentButton').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('add-student.php');
        },2000);
    });

    $('#addLecturerButton').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('add-lecturer.php');
        },2000);
    });

    $('#addSchoolButton').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('add-school.php');
        },2000);
    });

    $('#addDepartmentButton').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('add-department.php');
        },2000);
    });

    $('#addProgrammeButton').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('add-programme.php');
        },2000);
    });

    $('#addCourseButton').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('add-semester-course.php');
        },2000);
    });

    $('#sidebarIconDiv').on('click',function(){
        var chevron = $('#sidebarIconHit');
        if(chevron.html() == '<span id="sidebarIcon" class="glyphicon glyphicon-chevron-right pointer"></span>'){
            $('#sidebar').hide();
            $('#mainSidebar').show();
            setTimeout(function(){
                $('#sidebar').show("slide",{direction: "left"},1000);
                $('#unmoved').animate({"margin-left":'+=260',"width":'85%'},1000);
            },100);
            chevron.html('<span id="sidebarIcon" class="glyphicon glyphicon-chevron-left pointer"></span>');
        }
        else{
            $('#sidebarIconDiv').hide();
            $('#mainSidebar').hide("slide",{direction: "left"},1000);
            $('#unmoved').animate({"margin-left":'-=260',"width":'100%'},1000);
            setTimeout(function(){
                $('#sidebarIconDiv').show(800);
            },1100);
            chevron.html('<span id="sidebarIcon" class="glyphicon glyphicon-chevron-right pointer"></span>');
        }
    });

    $('#student').on('click',function(){
        var chevron = $('#studentChevron');
        if(chevron.html() == '<span class="fa fa-chevron-down pull-right"></span>'){
            $('#student').addClass('clicked');
            $('#studentDropDown').slideDown(1000);
            chevron.html('<span class="fa fa-chevron-up pull-right"></span>');
        }
        else{
            $('#student').removeClass('clicked');
            $('#studentDropDown').slideUp(1000);
            chevron.html('<span class="fa fa-chevron-down pull-right"></span>');
        }
    });

    $('#lecturer').on('click',function(){
            var chevron = $('#lecturerChevron');
            if(chevron.html() == '<span class="fa fa-chevron-down pull-right"></span>'){
                $('#lecturer').addClass('clicked');
                $('#lecturerDropDown').slideDown(1000);
                chevron.html('<span class="fa fa-chevron-up pull-right"></span>');
            }
            else{
                $('#lecturer').removeClass('clicked');
                $('#lecturerDropDown').slideUp(1000);
                chevron.html('<span class="fa fa-chevron-down pull-right"></span>');
            }
    });

    $('#timetable').on('click',function(){
        var chevron = $('#timetableChevron');
        if(chevron.html() == '<span class="fa fa-chevron-down pull-right"></span>'){
            $('#timetable').addClass('clicked');
            $('#timetableDropDown').slideDown(1000);
            chevron.html('<span class="fa fa-chevron-up pull-right"></span>');
        }
        else{
            $('#timetable').removeClass('clicked');
            $('#timetableDropDown').slideUp(1000);
            chevron.html('<span class="fa fa-chevron-down pull-right"></span>');
        }    });

    $('#school').on('click',function(){
        var chevron = $('#schoolChevron');
        if(chevron.html() == '<span class="fa fa-chevron-down pull-right"></span>'){
            $('#school').addClass('clicked');
            $('#schoolDropDown').slideDown(1000);
            chevron.html('<span class="fa fa-chevron-up pull-right"></span>');
        }
        else{
            $('#school').removeClass('clicked');
            $('#schoolDropDown').slideUp(1000);
            chevron.html('<span class="fa fa-chevron-down pull-right"></span>');
        }
    });

    $('#department').on('click',function(){
        var chevron = $('#departmentChevron');
        if(chevron.html() == '<span class="fa fa-chevron-down pull-right"></span>'){
            $('#department').addClass('clicked');
            $('#departmentDropDown').slideDown(1000);
            chevron.html('<span class="fa fa-chevron-up pull-right"></span>');
        }
        else{
            $('#department').removeClass('clicked');
            $('#departmentDropDown').slideUp(1000);
            chevron.html('<span class="fa fa-chevron-down pull-right"></span>');
        }
    });

    $('#programme').on('click',function(){
        var chevron = $('#programmeChevron');
        if(chevron.html() == '<span class="fa fa-chevron-down pull-right"></span>'){
            $('#programme').addClass('clicked');
            $('#programmeDropDown').slideDown(1000);
            chevron.html('<span class="fa fa-chevron-up pull-right"></span>');
        }
        else{
            $('#programme').removeClass('clicked');
            $('#programmeDropDown').slideUp(1000);
            chevron.html('<span class="fa fa-chevron-down pull-right"></span>');
        }
    });

    $('#course').on('click',function(){
        var chevron = $('#courseChevron');
        if(chevron.html() == '<span class="fa fa-chevron-down pull-right"></span>'){
            $('#course').addClass('clicked');
            $('#courseDropDown').slideDown(1000);
            chevron.html('<span class="fa fa-chevron-up pull-right"></span>');
        }
        else{
            $('#course').removeClass('clicked');
            $('#courseDropDown').slideUp(1000);
            chevron.html('<span class="fa fa-chevron-down pull-right"></span>');
        }
    });

    $('#dialogClose').on('click',function(){
       $('#dialog').fadeOut(1000);
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('.viewStudents').on('click',function(e){
        e.preventDefault();
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('view-student.php');
        },800);
    });

    $('.viewLecturers').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('view-lecturer.php');
        },1500);
    });

    $('.admins').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('view-admin.php');
        },1500);
    });

    $('.viewCourses').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('courses.php');
        },1500);
    });

    $('.viewSchool').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('view-schools.php');
        },1500);
    });

    $('.viewDepartment').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('view-departments.php');
        },1500);
    });

    $('.viewProgramme').on('click',function(){
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('view-programme.php');
        },1500);
    });
});

