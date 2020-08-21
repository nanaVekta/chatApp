$(document).ready( function( $ ) {
    var swipe =$( '.swipeBox' );
    swipe.swipebox({
        useCSS: true, // false will force the use of jQuery for animations
        useSVG: true, // false to force the use of png for buttons
        initialIndexOnArray: 0, // which image index to init when a array is passed
        hideCloseButtonOnMobile: false, // true will hide the close button on mobile devices
        removeBarsOnMobile: false,// false will show top bar on mobile devices
        hideBarsDelay: 5000, // delay before hiding bars on desktop
        videoMaxWidth: 1140, // videos max width
        loopAtEnd: false // true will return to the first image after the last image is reached
    });


    swipe.click( function( e ) {
        $( this ).swipebox();
    });
} );