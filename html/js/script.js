var scrolledPixel;

$(document).ready(function() {

    /*** On click of sidebar change text ***/
    
    $(".static-link ul li a").click(function(){
        var title = $(this).text();
        $(".sidebar-link-area h1").text(title);
    });

     /*** Animation on scroll of img boxes ***/    

         wow = new WOW({
            animateClass: 'box-animation',
            offset: 100,
            resetAnimation: false,
        });
        wow.init();
    
        headerResize();
        pageAnimation()    
})
$(window).resize(function() {
    headerResize();
});

/*** Mobile Header toggle ***/

function headerResize() {
    var screenWidth = $(window).width();
    if (screenWidth <= 992) {
        $("body").addClass("has-mob-header");

        $(".navbar-toggler").off("click");
        $(".navbar-toggler").on("click", function() {
            $(this).toggleClass("navbar-show");
            $("header nav").toggleClass("navbar-show");
            $("header nav").slideToggle(350);
        });

    } else {
        $("body").removeClass("has-mob-header");
        $("header nav").removeClass("navbar-show");
        $(".navbar-toggler").attr("aria-expanded", "false");
    }
}

function pageAnimation() {

     /*** On scroll Animation  ***/
     scrolledPixel = $(window).scrollTop();
     var headerHeight = $('header').outerHeight();
     const $sections = $('.sidebar-content > section');
     const $nav = $('.static-link ul');
 
     /*** Window Scroll event ***/
     $(window).scroll(function () {
 
         scrolledPixel = $(window).scrollTop();
         headerHeight = $('header').outerHeight();
         breadHeight = $('.breadcrumb').outerHeight();
         
 
         /*** on scroll section active  ***/
         $sections.each(function () {
             const top = $(this).offset().top - headerHeight - breadHeight,
                 bottom = top + $(this).outerHeight();
 
             if (scrolledPixel >= top && scrolledPixel <= bottom) {
                 $nav.find('li').removeClass('active');
                 $sections.removeClass('active');
 
                 $(this).addClass('active');
                 $nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
             }
         });
 
     });
 
     $nav.find('a').on('click', function () {
         var $el = $(this),
             id = $el.attr('href');

             if ($(window).width() < 871) {
                let scrollTo = $(id).offset().top -  ($('header').outerHeight() + $('.sidebar-link-area').outerHeight());
                $('html, body').animate({
                    scrollTop: scrollTo
                }, 700);
             }
             else {
                let scrollTo = $(id).offset().top -  $('header').outerHeight(); - $('.breadcrumb').outerHeight();
                $('html, body').animate({
                    scrollTop: scrollTo
                }, 700);
             }
        return false;
     });
}