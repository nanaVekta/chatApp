$(document).ready(function(){

$('#addLecturerDisability').on('mouseout',function(){
    if($(this).val() == 'yes'){
        $('#description').removeClass('hidden');
    }

    else {
        $('#description').addClass('hidden');
    }
});

$('#skip').on('click',function(){
    $('#dashboard').load('add-lecturer-contact.php').slideDown(2000);
});

    $('#skipContact').on('click',function(){
        $('#dashboard').load('add-lecturer-edu.php').slideDown(2000);
    });



$('#skipAcademic').on('click',function(){
    $('#dashboard').load('add-lecturer-picture.php').slideDown(2000);
});

    $('#addLecturerSchool').on('mouseout',function(){
        var schoolName = $(this).val(), departDiv = $('#departmentDiv');
        $.ajax({
            type: 'get',
            url: 'get-department.php?name='+schoolName,
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


    var form = $('#addLecturerForm');

form.validate({
    rules:
    {
        addLecturerTitle:{
          required: true,
            minlength: 2,
            maxlength: 30
        },
        addLecturerFirstName: {
            required: true,
            minlength: 2,
            maxlength: 30
        },
        addLecturerMiddleName: {
            required: false,
            minlength: 2,
            maxlength: 30
        },
        addLecturerLastName: {
            required: true,
            minlength: 2,
            maxlength: 80
        },
        addLecturerGender: {
            required: true
        },
        addLecturerDOBDay: {
            required: true
        },
        addLecturerDOBMonth: {
            required: true
        },
        addLecturerDOBYear: {
            required: true
        },
        addLecturerPOB: {
            required: true,
            minlength: 2,
            maxlength: 30
        },
        addLecturerNationality: {
            required: true,
            minlength: 2,
            maxlength: 20
        },
        addLecturerHomeTown: {
            required: true,
            minlength: 2,
            maxlength: 30
        },
        addLecturerRegion: {
            required: true
        },
        addLecturerMaritalStatus: {
            required: true
        },
        addLecturerNOC: {
            required: true,
            number:true,
            minlength: 1,
            maxlength: 3
        },
        addLecturerReligion: {
            required: true
        },
        addLecturerDisability: {
            required: true
        },
        addLecturerDisabilityDescription: {
            required: false,
            minlength: 6,
            maxlength: 400
        }

    },
    messages:
    {
        addLecturerTitle:{
            required: "provide first name",
            minlength: "should be at least 2 characters",
            maxlength: "should be at most 15 characters"
        },
        addLecturerFirstName:{
            required: "provide first name",
            minlength: "should be at least 2 characters",
            maxlength: "should be at most 30 characters"
        },
        addLecturerMiddleName:{
            minlength: "should be at least 2 characters",
            maxlength: "message should be at most 30 characters"
        },
        addLecturerLastName:{
            required: "provide last name",
            minlength: "should be at least 2 characters",
            maxlength: "should be at most 30 characters"
        },
        addLecturerGender: "select gender",
        addLecturerDOBDay: "select day",
        addLecturerDOBMonth: "select month",
        addLecturerDOBYear: "select year",
        addLecturerPOB:{
            required: "provide place of birth",
            minlength: "should be at least 2 characters",
            maxlength: "should be at most 30 characters"
        },
        addLecturerNationality:{
            required: "provide nationality",
            minlength: "should be at least 2 characters",
            maxlength: "should be at most 20 characters"
        },
        addLecturerHomeTown:{
            required: "provide home town",
            minlength: "should be at least 2 characters",
            maxlength: "should be at most 30 characters"
        },
        addLecturerRegion: "select region",
        addLecturerMaritalStatus: "select marital status",
        addLecturerNOC:{
            required: "provide number of children",
            number: "only digits",
            minlength: "should be at least 1 character",
            maxlength: "should be at most 3 characters"
        },
        addLecturerReligion: "select religion",
        addLecturerDisability: "select disability status",
        addLecturerDisabilityDescription:{
            minlength: "should be at least 6 characters",
            maxlength: "should be at most 400 characters"
        }
    },
    submitHandler: submitLecturerPersonalInfoForm
});

function submitLecturerPersonalInfoForm() {
    var button = $('#addLecturerSubmit');
    var errorDiv = $('#addLecturerError'), data = form.serialize();

    $.ajax({
        type: 'get',
        url: 'submit-lecturer-info.php',
        data: data,
        beforeSend: function () {
            button.html('<img src="images/loading.gif"> sending...').attr('disabled,disabled');
            errorDiv.fadeOut();
        },

        success :  function(data) {
            if(data=="inserted") {
                errorDiv.fadeIn(1000, function(){
                    errorDiv.html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Info inserted successfully. Please Wait....</div>');
                    button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');
                    setTimeout(function(){
                        $('#dashboard').load('add-lecturer-contact.php').slideDown(2000);
                    },1000)
                });
            }

            else if(data=='notInserted'){

                errorDiv.fadeIn(1000, function(){

                    errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Could not insert data, please try again later!</div>');

                    button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');

                });

            }

            else if(data=='exist'){

                errorDiv.fadeIn(1000, function(){

                    errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;Sorry student already exist in our database!</div>');

                    button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');

                });

            }

            else if(data=='error'){

                errorDiv.fadeIn(1000, function(){

                    errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please use the right approach</div>');

                    button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');

                });

            }

            else{

                errorDiv.fadeIn(1000, function(){

                    errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Oops an error occurred. Please try again later.</div>');

                    button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');

                });

            }
        },

        error: function(){
            errorDiv.fadeIn(1000, function () {
                button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');
                errorDiv.html('<div class="alert alert-danger"><i class="glyphicon glyphicon-info-sign"></i>Please check your connection and try again later</div>')
            })
        }
    });

    return false;
}



    var contactForm = $('#addLecturerContactForm');
    contactForm.validate({
        rules:{
            addLecturerPostalAddress:{
                required: true,
                minlength: 6,
                maxlength: 20
            },
            addLecturerPostalTown:{
                required: true,
                minlength: 2,
                maxlength: 20
            },
            addLecturerContactNumber:{
                required: true,
                minlength: 10,
                maxlength: 20
            },
            addLecturerPostalRegion:{
                required: true
            },
            addLecturerEmail:{
                required: true,
                email:true
            }
        },
        messages:{
            addLecturerPostalAddress:{
                required: 'provide postal address',
                minlength: 'should be at least 6 characters',
                maxlength: 'should be at most 20 characters'
            },
            addLecturerPostalTown:{
                required: 'provide postal town',
                minlength: 'should be at least 2 characters',
                maxlength: 'should be at most 20 characters'
            },
            addLecturerPostalRegion: 'select a region',
            addLecturerContactNumber:{
                required: 'provide contact number',
                minlength: 'should be at least 10 characters',
                maxlength: 'should be at most 20 characters'
            },
            addLecturerEmail: 'provide a valid email'
        },
        submitHandler: submitLecturerContact
    });

    function submitLecturerContact(){
        var button = $('#addLecturerContactSubmit');
        var errorDiv = $('#addLecturerContactError'), data = contactForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-lecturer-contact.php',
            data: data,
            beforeSend: function () {
                button.html('<img src="images/loading.gif"> sending...').attr('disabled,disabled');
                errorDiv.fadeOut();
            },

            success :  function(data) {
                if(data=="inserted") {
                    errorDiv.fadeIn(1000, function(){
                        errorDiv.html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Info inserted successfully. Please Wait....</div>');
                        button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');
                        setTimeout(function(){
                            $('#dashboard').load('add-lecturer-edu.php').slideDown(2000);
                        },1000)
                    });
                }

                else if(data=='notInserted'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Could not insert data, please try again later!</div>');

                        button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');

                    });

                }

                else if(data=='exist'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;Sorry student email already exist in our database!</div>');

                        button.html('<span class="glyphicon glyphicon-log-in"></span> Sign-Up').removeAttr('disabled');

                    });

                }

                else if(data=='error'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please use the right approach</div>');

                        button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');

                    });

                }

                else{

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Oops an error occurred please try again later</div>');

                        button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');

                    });

                }
            },

            error: function(){
                errorDiv.fadeIn(1000, function () {
                    button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');
                    errorDiv.html('<div class="alert alert-danger"><i class="glyphicon glyphicon-info-sign"></i>Please check your connection and try again later</div>')
                })
            }
        });

        return false;
    }


    var programmeForm = $('#addLecturerProgrammeForm');
    programmeForm.validate({
        rules:{
            addLecturerSchool:{
                required: true
            },
            addDepartment:{
                required: true
            },
            addLecturerSkillDescription:{
                required: true,
                minlength: 5,
                maxlength: 400
            },
            addLecturerYearAdmitted:{
                required: true
            }
        },
        messages:{
            addLecturerSchool:{
                required: 'select name of school'
            },
            addDepartment:{
                required: 'select name of department'
            },
            addLecturerSkillDescription:{
                required: 'provide skills and areas of expertise',
                minlength: 'should be at least 5 characters',
                maxlength: 'should be at most 400 characters'
            },
            addLecturerYearAdmitted: 'select year employed'
        },
        submitHandler: submitLecturerAcademic
    });

    function submitLecturerAcademic(){
        var button = $('#addLecturerEduSubmit');
        var errorDiv = $('#addLecturerAcademicError'), data = programmeForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-lecturer-academic.php',
            data: data,
            beforeSend: function () {
                button.html('<img src="images/loading.gif"> sending...').attr('disabled,disabled');
                errorDiv.fadeOut();
            },

            success :  function(data) {
                if(data=="inserted") {
                    errorDiv.fadeIn(1000, function(){
                        errorDiv.html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Info inserted successfully. Please Wait....</div>');
                        button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');
                        setTimeout(function(){
                            $('#dashboard').load('add-lecturer-picture.php').slideDown(2000);
                        },1000)
                    });
                }

                else if(data=='notInserted'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Could not insert data, please try again later!</div>');

                        button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');

                    });

                }


                else if(data=='error'){

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please use the right approach</div>');

                        button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');

                    });

                }

                else{

                    errorDiv.fadeIn(1000, function(){

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+data+'</div>');

                        button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');

                    });

                }
            },

            error: function(){
                errorDiv.fadeIn(1000, function () {
                    button.html('<span class="fa fa-forward"></span> Next').removeAttr('disabled');
                    errorDiv.html('<div class="alert alert-danger"><i class="glyphicon glyphicon-info-sign"></i>Please check your connection and try again later</div>')
                })
            }
        });

        return false;
    }
});