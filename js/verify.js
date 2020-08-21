$(document).ready(function(){
   var skipProfile = $('#skipProfile');
    var div = $('#verifyDiv');
    skipProfile.on('click',function(){
        $('#verifyWelcome').fadeOut(5000);
        div.load('verifycover.php').fadeIn(2500);
    });

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
                        $('#btn-add-pic').html('<img src="images/loading.gif" height="10"/> &nbsp; setting ...');
                        $("#picError").html('<div class="alert alert-success"><span class="glyphicon glyphicon-ok"></span> Profile Picture changed successfully!</div>');
                        setTimeout(function () {
                            $('#verifyWelcome').fadeOut(5000);
                            div.load('verifycover.php').fadeIn(1500);
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

                        $("#picError").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; :( Oops an error occurred. Please try again later</div>');
                        $("#pic-label").removeClass('hidden');
                        $('#btn-add-pic').html('<i class="glyphicon glyphicon-upload"></i>&nbsp;Please wait...').addClass('hidden');

                    });

                }
            }
        });
    });

});
