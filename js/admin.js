$(document).ready(function(){
    var div = $('#dashboard');

    $( ".view" ).click(function( ) {
        var id = $(this).attr('id').replace(/openStudent-/,'');
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('view-student-details.php?studentId='+id);
        },800);
    });

    $( ".viewLec" ).click(function( ) {
        var id = $(this).attr('id').replace(/openLecturer-/,'');
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('view-lecturer-details.php?lecturerId='+id);
        },800);
    });

    div.on( "click", ".pagination a", function (e){
        e.preventDefault();
        var page = $(this).attr("data-page"); //get page number from link
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');

        div.load("view-student.php",{"page":page});

    });

    div.on( "click", ".lecturePagination a", function (e){
        e.preventDefault();
        var page = $(this).attr("data-page"); //get page number from link
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');

        div.load("view-lecturer.php",{"page":page});

    });

    div.on( "click", ".schoolPagination a", function (e){
        e.preventDefault();
        var page = $(this).attr("data-page"); //get page number from link
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');

        div.load("view-schools.php",{"page":page});

    });

    div.on( "click", ".departmentPagination a", function (e){
        e.preventDefault();
        var page = $(this).attr("data-page"); //get page number from link
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');

        div.load("view-departments.php",{"page":page});

    });

    $('.viewStudents').on('click',function(e){
        e.preventDefault();
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');
        setTimeout(function(){
            div.load('view-student.php');
        },800);
    });

    $('#num-of-items').on('change',function () {
        var numOfItems = $(this).val();
        div.html('<img id="dashboardImg" src="images/btn-ajax-loader.gif" align="center">');

        div.load("view-student.php",{"page": 1, "numOfItems": numOfItems});
    });

    $('#search-students').on('keyup',function () {
        var keyword = $(this).val();
            $.ajax({
                url : 'search-students.php',
                type : 'post',
                data : {query : keyword},
                success : function (data) {
                    $('#student-table').html(data);
                },
                error : function (e, w) {
                    alert(e +' error '+w);
                }
            })
    });
});

