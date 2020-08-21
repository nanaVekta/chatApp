$('document').ready(function(){

    $('.join-chat').on('click',function () {
        $('#message-loader').removeClass('hidden');
       var courseID = $(this).attr('id').replace(/course-/,'');
       setTimeout(function () {
               $('#message-loader').addClass('hidden');
               $.ajax({
                   url: 'loadMessages.php',
                   type: 'get',
                   data: {course: courseID, type: 'private'},
                   success: function (data) {
                       $('#load-messages').html(data).fadeIn(1800);
                   }
               });

       },1800);
    });

});

//set timer to load initial records
/*$(window).load(function() {
    $('#message-loader').addClass('hidden');
    var sender = $('#sender').val();
    var recipient = $('#recipient').val();
    $.ajax({
        url: 'loadMessages.php',
        type: 'post',
        data: {sender: sender, recipient: recipient},
        success: function (data) {
            $('#load-messages').prepend(data).fadeIn(1800);
        }
    });
});*/

function showMyImage(fileInput) {
    $('#close-div').removeClass('hidden');
    $('#send-message').removeAttr('disabled');
    $('#attachFile').attr('disabled','disabled');
    $('#attachFileLabel').css('cursor','no-drop');
    $('#appendMessageAttachment').html('');
    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {
        $('#appendMessageAttachment').prepend('<img id="thumbnail'+i+'" class="loaded-images" style="width:20%; margin:10px;"  src="" alt="image"/>');
        var file = files[i];
        var imageType = /image.*/;
        if (!file.type.match(imageType)) {
            continue;
        }
        var img=document.getElementById("thumbnail"+i);
        img.file = file;
        var reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
    }
}

function showMyFile(){
    $('#close-div').removeClass('hidden');
    $('#send-message').removeAttr('disabled');
    $('#attachImage').attr('disabled','disabled');
    $('#attachImageLabel').css('cursor','no-drop');
    var fileName = $('#attachFile').val().split("\\").pop();
    $('#appendMessageAttachment').html('<span class="fa fa-file"></span> &nbsp; '+fileName);
    $('.navbar-fixed-bottom')
        .css('margin-top','50px')
        .css('padding-bottom','50px');
}