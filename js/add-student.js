$(document).ready(function(){
    $('#addStudentDisability').on('mouseout',function(){
        if($(this).val() == 'yes'){
            $('#description').removeClass('hidden');
        }

        else {
            $('#description').addClass('hidden');
        }
    });

    $('#skip').on('click',function(){
        $('#dashboard').load('add-student-contact.php').slideDown(2000);
    });

    $('#skipContact').on('click',function(){
        $('#dashboard').load('add-student-guardian.php').slideDown(2000);
    });

    $('#skipGuardian').on('click',function(){
        $('#dashboard').load('add-student-edu.php').slideDown(2000);
    });

    $('#skipPast').on('click',function(){
        $('#dashboard').load('add-student-programme.php').slideDown(2000);
    });

    $('#skipAcademic').on('click',function(){
        $('#dashboard').load('add-student-picture.php').slideDown(2000);
    });

    $('#addStudentSchool').on('mouseout',function(){
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

    $('#addDepartment').on('mouseout',function(){
        var departName = $(this).val(), programmeDiv = $('#programmeDiv');
        $.ajax({
            type: 'get',
            url: 'get-programme.php?name='+departName,
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
    });


    var form = $('#addStudentForm');

    form.validate({
        rules:
        {
            addStudentFirstName: {
                required: true,
                minlength: 2,
                maxlength: 10
            },
            addStudentMiddleName: {
                required: false,
                minlength: 2,
                maxlength: 10
            },
            addStudentLastName: {
                required: true,
                minlength: 2,
                maxlength: 80
            },
            addStudentGender: {
                required: true
            },
            addStudentDOBDay: {
                required: true
            },
            addStudentDOBMonth: {
                required: true
            },
            addStudentDOBYear: {
                required: true
            },
            addStudentPOB: {
                required: true,
                minlength: 2,
                maxlength: 30
            },
            addStudentNationality: {
                required: true,
                minlength: 2,
                maxlength: 20
            },
            addStudentHomeTown: {
                required: true,
                minlength: 2,
                maxlength: 30
            },
            addStudentRegion: {
                required: true
            },
            addStudentMaritalStatus: {
                required: true
            },
            addStudentNOC: {
                required: true,
                number:true,
                minlength: 1,
                maxlength: 3
            },
            addStudentReligion: {
                required: true
            },
            addStudentDisability: {
                required: true
            },
            addStudentDisabilityDescription: {
                required: false,
                minlength: 6,
                maxlength: 400
            }

        },
        messages:
        {
            addStudentFirstName:{
                required: "provide first name",
                minlength: "should be at least 2 characters",
                maxlength: "should be at most 10 characters"
            },
            addStudentMiddleName:{
                minlength: "should be at least 2 characters",
                maxlength: "message should be at most 10 characters"
            },
            addStudentLastName:{
                required: "provide last name",
                minlength: "should be at least 2 characters",
                maxlength: "should be at most 10 characters"
            },
            addStudentGender: "select gender",
            addStudentDOBDay: "select day",
            addStudentDOBMonth: "select month",
            addStudentDOBYear: "select year",
            addStudentPOB:{
                required: "provide place of birth",
                minlength: "should be at least 2 characters",
                maxlength: "should be at most 30 characters"
            },
            addStudentNationality:{
                required: "provide nationality",
                minlength: "should be at least 2 characters",
                maxlength: "should be at most 20 characters"
            },
            addStudentHomeTown:{
                required: "provide home town",
                minlength: "should be at least 2 characters",
                maxlength: "should be at most 30 characters"
            },
            addStudentRegion: "select region",
            addStudentMaritalStatus: "select marital status",
            addStudentNOC:{
                required: "provide number of children",
                number: "only digits",
                minlength: "should be at least 1 character",
                maxlength: "should be at most 3 characters"
            },
            addStudentReligion: "select religion",
            addStudentDisability: "select disability status",
            addStudentDisabilityDescription:{
                minlength: "should be at least 6 characters",
                maxlength: "should be at most 400 characters"
            }
        },
        submitHandler: submitStudentPersonalInfoForm
    });

    function submitStudentPersonalInfoForm() {
        var button = $('#addStudentSubmit');
        var errorDiv = $('#addStudentError'), data = form.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-student-info.php',
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
                            $('#dashboard').load('add-student-contact.php').slideDown(2000);
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



    var contactForm = $('#addStudentContactForm');
    contactForm.validate({
        rules:{
            addStudentPostalAddress:{
                required: true,
                minlength: 6,
                maxlength: 20
            },
            addStudentPostalTown:{
                required: true,
                minlength: 2,
                maxlength: 20
            },
            addStudentContactNumber:{
                required: true,
                minlength: 10,
                maxlength: 20
            },
            addStudentPostalRegion:{
              required: true
            },
            addStudentEmail:{
                required: true,
                email:true
            }
        },
        messages:{
            addStudentPostalAddress:{
                required: 'provide postal address',
                minlength: 'should be at least 6 characters',
                maxlength: 'should be at most 20 characters'
            },
            addStudentPostalTown:{
                required: 'provide postal town',
                minlength: 'should be at least 2 characters',
                maxlength: 'should be at most 20 characters'
            },
            addStudentPostalRegion: 'select a region',
            addStudentContactNumber:{
                required: 'provide contact number',
                minlength: 'should be at least 10 characters',
                maxlength: 'should be at most 20 characters'
            },
            addStudentEmail: 'provide a valid email'
        },
         submitHandler: submitStudentContact
    });

    function submitStudentContact(){
        var button = $('#addStudentContactSubmit');
        var errorDiv = $('#addStudentContactError'), data = contactForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-student-contact.php',
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
                            $('#dashboard').load('add-student-guardian.php').slideDown(2000);
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



    var guardianForm = $('#addStudentGuardianForm');
    guardianForm.validate({
        rules:{
            addStudentGuardianFullName:{
                required: true,
                minlength: 4,
                maxlength: 200
            },
            addStudentGuardianRelationship:{
                required: true,
                minlength: 2,
                maxlength: 20
            },
            addStudentGuardianOccupation:{
              required: true,
                minlength: 3,
                maxlength: 20
            },
            addStudentGuardianPhone:{
                required: true,
                minlength: 10,
                maxlength: 20
            },
            addStudentGuardianAddress:{
                required: true,
                minlength: 6,
                maxlength: 20
            },
            addStudentGuardianPostalTown:{
                required: true,
                minlength: 3,
                maxlength: 20
            },
            addStudentGuardianPostalRegion:{
                required: true
            },
            addStudentGuardianEmail:{
                required: false,
                email:true
            }
        },
        messages:{
            addStudentGuardianFullName:{
                required: 'provide guardian full name',
                minlength: 'should be at least 4 characters',
                maxlength: 'should be at most 200 characters'
            },
            addStudentGuardianRelationship:{
                required: 'provide your relationship with guardian',
                minlength: 'should be at least 2 characters',
                maxlength: 'should be at most 20 characters'
            },
            addStudentGuardianPhone:{
                required: "provide guardian's phone number",
                minlength: 'should be at least 10 characters',
                maxlength: 'should be at most 20 characters'
            },
            addStudentGuardianAddress:{
                required: "provide guardian's postal address",
                minlength: 'should be at least 6 characters',
                maxlength: 'should be at most 20 characters'
            },
            addStudentGuardianPostalTown:{
                required: 'provide postal town',
                minlength: 'should be at least 3 characters',
                maxlength: 'should be at most 20 characters'
            },
            addStudentGuardianOccupation:{
                required: 'provide occupation',
                minlength: 'should be at least 3 characters',
                maxlength: 'should be at most 20 characters'
            },
            addStudentGuardianPostalRegion: 'select a region',
            addStudentGuardianEmail: 'provide a valid email'
        },
        submitHandler: submitStudentGuardian
    });

    function submitStudentGuardian(){
        var button = $('#addStudentGuardianSubmit');
        var errorDiv = $('#addStudentGuardianError'), data = guardianForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-student-guardian.php',
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
                            $('#dashboard').load('add-student-edu.php').slideDown(2000);
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

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Oops an error occurred. Please try again later</div>');

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


    var eduForm = $('#addStudentEducationalForm');
    eduForm.validate({
        rules:{
            addStudentInstitutionName:{
                required: true,
                minlength: 4,
                maxlength: 200
            },
            addStudentInstitutionProgramme:{
                required: true,
                minlength: 2,
                maxlength: 100
            },
            addStudentYearCompleted:{
                required: true
            }
        },
        messages:{
            addStudentInstitutionName:{
                required: 'provide institution name',
                minlength: 'should be at least 4 characters',
                maxlength: 'should be at most 200 characters'
            },
            addStudentInstitutionProgramme:{
                required: 'provide programme offered',
                minlength: 'should be at least 2 characters',
                maxlength: 'should be at most 100 characters'
            },
            addStudentYearCompleted: 'select year completed'
        },
        submitHandler: submitStudentPastInstitution
    });

    function submitStudentPastInstitution(){
        var button = $('#addStudentEducationSubmit');
        var errorDiv = $('#addStudentEducationalError'), data = eduForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-student-edu.php',
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
                            $('#dashboard').load('add-student-programme.php').slideDown(2000);
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

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Oops an error occurred. Please try again later</div>');

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


    var programmeForm = $('#addStudentProgrammeForm');
    programmeForm.validate({
        rules:{
            addStudentSchool:{
                required: true
            },
            addDepartment:{
                required: true
            },
            addStudentProgramme:{
                required: true
            },
            addStudentYearToComplete:{
                required: true
            },
            studentPassword:{
                required: true
            }
        },
        messages:{
            addStudentSchool:{
                required: 'select name of school'
            },
            addDepartment:{
                required: 'select name of department'
            },
            addStudentProgramme: 'select programme',
            addStudentYearToComplete: 'select year to complete',
            studentPassword: 'make sure this field is not empty'
        },
        submitHandler: submitStudentProgramme
    });

    function submitStudentProgramme(){
        var button = $('#addStudentProgrammeSubmit');
        var errorDiv = $('#addStudentAcademicError'), data = programmeForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-student-academic.php',
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
                            $('#dashboard').load('add-student-picture.php').slideDown(2000);
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
