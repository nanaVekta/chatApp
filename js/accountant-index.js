$(document).ready(function () {
    var div = $('#formDiv');
   $('.addFees').on('click',function () {
        div.html('<img src="images/btn-ajax-loader.gif" id="dashboardImg" alt="loading...">');
       $('.breadcrumb').html(' <li><a href="dashboard.php">Dashboard</a> </li><li>Students</li> <li>Add Fees</li>')

       window.setTimeout(function () {
           div.load('add-year-fees.php');
       },800);
   }) ;

    var feesForm = $('#addFeesForm');
    feesForm.validate({
        rules:{
            addFeesProgramme:{
                required: true
            },
            addFeesAmount:{
                required: true,
                number: true
            },
            addFeesLevel:{
                required: true
            }
        },
        messages:{
            addFeesProgramme:{
                required: 'select programme'
            },
            addFeesAmount:{
                required: 'input amount',
                number: 'should be number'
            },
            addFeesLevel:{
                required: 'select level'
            }
        },
        submitHandler: submitFees
    });
    function submitFees(){
        var button = $('#addFeesSubmit');
        var errorDiv = $('#addFeesError'), data = feesForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-fees.php',
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

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;Fees for this programme has already been inserted</div>');

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

    $('#searchYear').on('mouseout',function () {
       var year = $(this).val();
        var div = $('#loadSearch');

        $.ajax({
           type: 'get',
            url: 'get-fees.php?year='+year,
            beforeSend: function () {
                div.html('<h2 class="center-block"><span class="fa fa-spin fa-spinner"></span> Please wait...</h2>');
            },
            success:function (data) {
                var item = $(data).hide().fadeIn(800);
                div.html(item);
            },
            error:function (e) {
                alert(e+' please check your internet connection');
            }
        });
    });

    $('.addStudentFees').on('click',function () {
        div.html('<img src="images/btn-ajax-loader.gif" id="dashboardImg" alt="loading...">');
        $('.breadcrumb').html(' <li><a href="dashboard.php">Dashboard</a> </li><li>Students</li> <li>Add Fees</li>')
        window.setTimeout(function () {
            div.load('add-student-fees.php');
        },800);

    }) ;
    
    $('#addStudentFeesProgramme').on('mouseout', function () {
       var prog = $(this).val(), level = $('#addStudentFeesLevel').val();
        var div = $('#loadStudents');
        $.ajax({
            type: 'get',
            url: 'get-student-with-programme.php?prog='+prog+'&level='+level,
            beforeSend: function () {
                div.html('<h4 class="text-center"><span class="fa fa-spin fa-spinner"></span> please wait..</h4>');
            },
            success: function (data) {
                div.html(data);
            },
            error: function (e){
                alert(e+' please check your internet connection');
            }

        })
    });

    $('#addStudentFeesLevel').on('mouseout', function () {
        var level = $(this).val(), prog = $('#addStudentFeesProgramme').val();
        var div = $('#loadStudents');
        $.ajax({
            type: 'get',
            url: 'get-student-with-programme.php?prog='+prog+'&level='+level,
            beforeSend: function () {
                div.html('<h4 class="text-center"><span class="fa fa-spin fa-spinner"></span> please wait..</h4>');
            },
            success: function (data) {
                div.html(data);
            },
            error: function (e){
                alert(e+' please check your internet connection');
            }

        })
    });

    var studentFeesForm = $('#addStudentFeesForm');
    studentFeesForm.validate({
        rules:{
            addStudentFeesProgramme:{
                required: true
            },
            addStudentFeesAmount:{
                required: true,
                number: true
            },
            addStudentFeesStudent:{
                required: true
            },
            addStudentFeesLevel:{
                required: true
            }
        },
        messages:{
            addStudentFeesProgramme:{
                required: 'select programme'
            },
            addStudentFeesAmount:{
                required: 'input amount',
                number: 'should be number'
            },
            addStudentFeesStudent:{
                required: 'select Student'
            },
            addStudentFeesLevel:{
                required: 'select level'
            }
        },
        submitHandler: submitStudentFees
    });
    function submitStudentFees(){
        var button = $('#addStudentFeesSubmit');
        var errorDiv = $('#addStudentFeesError'), data = studentFeesForm.serialize();

        $.ajax({
            type: 'get',
            url: 'submit-student-fees.php',
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

                        errorDiv.html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;Please insert fees details for selected programme</div>');

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

    $('.viewStudentFees').on('click',function () {
        div.html('<img src="images/btn-ajax-loader.gif" id="dashboardImg" alt="loading...">');
        $('.breadcrumb').html(' <li><a href="dashboard.php">Dashboard</a> </li><li>Fees</li> <li>View Students</li>')

        window.setTimeout(function () {
            div.load('view-payment-info.php');
        },800);
    }) ;
});