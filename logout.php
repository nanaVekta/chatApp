<?php require_once("includes/functions.php"); ?>
<?php
session_start();
if (isset($_GET['page'])) {
    $page = $_GET['page'];
    $_SESSION = array();
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 42000, '/');
    }
    session_abort();
    session_destroy();
    if($page == 'index'){
        redirect_to('login.php');
    }
    else if($page == 'dashboard'){
        redirect_to('admin.php');
    }else{
        redirect_to('staff-login.php');
    }

}
else echo 'Request for this page is blocked. Please use the right approach.'
?>
