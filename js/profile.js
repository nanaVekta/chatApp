
$(window).load(function() {
    var div = $('#showContent');

setTimeout(function(){
        //load profile records
        div.load( "profileinfo.php");
    },1800);

});

$(document).ready(function(){

    var div = $('#showContent');

    $('#loadProfileInfo').on('click',function(e){
        e.preventDefault();
        $(this).html('<img src="images/loading.gif" height="20"> Profile');
       div.load('profileinfo.php',function(){
           $('#loadProfileInfo').html('<span class="glyphicon glyphicon-user" ></span> Profile')
       });
    });

    $('#loadPasswordInfo').on('click',function(e){
        e.preventDefault();
        $(this).html('<img src="images/loading.gif" height="20"> Account');
        div.load('changepassword.php',function(){
            $('#loadPasswordInfo').html('<span class="glyphicon glyphicon-paperclip"></span> Account')
        });
    });


    var userId = $('input[name=encId]').val();

    //change changeName div into an input field
    var nameBtn = $('#btnChangeName');
    nameBtn.on('click',function(e){
        e.preventDefault();
        edit('editname.php?u_id='+userId, $('#changeName'), nameBtn);
    });

    //change changeEmail div into an input field
    var emailBtn = $('#btnChangeEmail');
    emailBtn.on('click',function(e){
        e.preventDefault();
        edit('editemail.php?u_id='+userId, $('#changeEmail'), emailBtn);
    });

    //change changeBio div into an input field
    var bioBtn = $('#btnChangeBio');
    bioBtn.on('click',function(e){
        e.preventDefault();
        edit('editbio.php?u_id='+userId, $('#changeBio'), bioBtn);
    });

    //function to edit the various fields
    function edit(url, show, button){
        $.ajax({
            type:'get',
            url:url,
            beforeSend:function(){
                button.html('<img src="images/loading.gif" alt="loading...."> loading...');
            },
            success: function(data){
                var item =$(data).hide().fadeIn(800);
                show.html(item);
            },
            error:function(e){
                button.html('<span class="glyphicon glyphicon-edit"></span>&nbsp;change');
                alert('Please check your internet connection and try again.\n '+e);
            }
        });
    }//function edit

    //script for uploading profile photo
//hide label with id pic-label and show button with id btn-add-pic
    $('#pic-label').on('click',function(){
        $(this).addClass('hidden');
        $('#btn-add-pic').removeClass('hidden');
    });

    //change the value of the btn-add-pic button to the name file to be uploaded
    $('#pic-file').on('change',function(){
        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp; '+$("#pic-file").val().split("\\").pop())});

    //script to upload profile photo
    $('#picForm').on('submit',function(e){
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            url:'updateprofile.php',
            type:'POST',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function(){
                $('#picError').fadeOut(800);
                $('#btn-add-pic').html('<i class="glyphicon glyphicon-transfer"> &nbsp; sending ...');
            },
            success: function(data){
                if(data=="1") {
                    $("#picError").fadeIn(1000, function() {
                        $('#btn-add-pic').html('<img src="../images/loading.gif" /> &nbsp; setting ...');
                        $("#picError").html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok-sign"></span> Profile Picture changed successfully! Please wait while page reloads</div>');
                        setTimeout(function () {
                            window.location.href = 'profile.php?id='+userId;
                        }, 3000);
                    });

                }
                else if(data=='0'){

                    $("#picError").fadeIn(1000, function(){

                        $("#picError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Cannot make changes at the moment, please try again later!</div>');
                        $("#pic-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else if(data=='2'){

                    $("#picError").fadeIn(1000, function(){

                        $("#picError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Unsupported format! Please choose another image</div>');
                        $("#pic-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else if(data == '3'){

                    $("#picError").fadeIn(1000, function(){

                        $("#picError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; An error occurred in uploading file. Please try again later.</div>');
                        $("#pic-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else if(data == "4"){

                    $("#picError").fadeIn(1000, function(){

                        $("#picError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please select an image.</div>');
                        $("#pic-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else if(data == "5"){

                    $("#picError").fadeIn(1000, function(){

                        $("#picError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Image size too large.</div>');
                        $("#pic-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else if(data == "6"){

                    $("#picError").fadeIn(1000, function(){

                        $("#picError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; An error occurred while reading file! Please try again later.</div>');
                        $("#pic-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else{
                    $("#picError").fadeIn(1000, function(){

                        $("#picError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;:( Oops an error occurred. Please try again later</div>');
                        $("#pic-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }
            }
        });
    });


    //script for uploading cover photo
    //hide label with id pic-label and show button with id btn-add-pic
    $('#cover-label').on('click',function(){
        $(this).addClass('hidden');
        $('#btn-add-cover').removeClass('hidden');
    });

    //change the value of the btn-add-pic button to the name file to be uploaded
    $('#cover-file').on('change',function(){
        $('#btn-add-cover').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;'+$("#cover-file").val().split("\\").pop())});

    //script to upload profile photo
    $('#coverForm').on('submit',function(e){
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            url:'updatecover.php',
            type:'POST',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            beforeSend: function(){
                $('#coverError').fadeOut(800);
                $('#btn-add-cover').html('<i class="glyphicon glyphicon-transfer"> &nbsp; sending ...');
            },
            success: function(data){
                if(data=="1") {
                    $("#coverError").fadeIn(1000, function() {
                        $('#btn-add-cover').html('<img src="images/loading.gif" height="14"/> &nbsp; setting ...');
                        $("#coverError").html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok-sign"></span> Cover Picture changed successfully! Please wait while page reloads</div>');

                        setTimeout(function () {
                            window.location.href = 'profile.php?id='+userId;
                        }, 3000);
                    });

                }

                else if(data=='0'){

                    $("#coverError").fadeIn(1000, function(){

                        $("#coverError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Cannot make changes at the moment, please try again later!</div>');
                        $("#cover-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else if(data=='2'){

                    $("#coverError").fadeIn(1000, function(){

                        $("#coverError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Unsupported format! Please choose another image</div>');
                        $("#cover-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else if(data == '3'){

                    $("#coverError").fadeIn(1000, function(){

                        $("#coverError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; An error occurred in uploading file. Please try again later.</div>');
                        $("#cover-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else if(data == "4"){

                    $("#coverError").fadeIn(1000, function(){

                        $("#coverError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Please select an image.</div>');
                        $("#cover-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else if(data == "5"){

                    $("#coverError").fadeIn(1000, function(){

                        $("#coverError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; Image size too large.</div>');
                        $("#cover-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else if(data == "6"){

                    $("#coverError").fadeIn(1000, function(){

                        $("#coverError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; An error occurred while reading file! Please try again later.</div>');
                        $("#cover-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }

                else{
                    $("#coverError").fadeIn(1000, function(){

                        $("#coverError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp;:( Oops an error occurred. Please try again later</div>');
                        $("#cover-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }
            }
        });
    });

    var profilePic = $('#tooltipProfilePic').val();
    var username = $('#tooltipName').val();
    $('[data-toggle="tooltip"]').tooltip({
        html: true,
        title:'<center><img src="profile/'+profilePic+'" class="img-circle img-responsive center-block" align="center"></center>'+
        '<br><strong><p>'+username+'</p></strong><hr>'+
        '<a role="button" class="btn btn-primary" type="button" href="logout.php"><span class="glyphicon glyphicon-log-out"> LogOut</span> </a>',
        placement: 'bottom',
        animation: true,
        delay: {show: 300, hide: 3000}
    })

});


