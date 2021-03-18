$(function () {

    "use strict";

    var wind = $(window);

    var main_height = $(".main-height").outerHeight();

    $(".sub-height").outerHeight(main_height);



    // scrollIt
    $.scrollIt({
        upKey: 38,                // key code to navigate to the next section
        downKey: 40,              // key code to navigate to the previous section
        easing: 'swing',         // the easing function for animation
        scrollTime: 600,          // how long (in ms) the animation takes
        activeClass: 'active',    // class given to the active nav element
        onPageChange: null,       // function(pageIndex) that is called when page is changed
        topOffset: -60            // offste (in px) for fixed top navigation
    });

    // navbar scrolling background
    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar-default"),
            logo = $(".navbar .logo> img");

        if (bodyScroll > 300) {

            navbar.addClass("nav-scroll");
            logo.attr('src', 'http://15.206.74.51/uploads/sochGlobalLogo5.png');

        } else {

            navbar.removeClass("nav-scroll");
            logo.attr('src', 'http://15.206.74.51/uploads/sochGlobalLogo5.png');
        }
    });



    // button scroll to top
    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            button_top = $(".button-top");

        if (bodyScroll > 700) {

            button_top.addClass("button-show");

        } else {

            button_top.removeClass("button-show");
        }
    });



    // owlCarousel
    $('.slider .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500,
        dots: true,
        nav: true,
        navText: ['<span>Prev</span>',
            '<span>Next</span>'],
        animateOut: 'fadeOut'
    });

    // owlCarousel
    $('.carousel .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500,
        dots: true,
        nav: true,
        navText: ['<span>Prev</span>',
            '<span>Next</span>']
    });


    // owlCarousel
    $('.team .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500
    });

    // owlCarousel
    $('.clients .owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 15,
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500
    });

    // owlCarousel
    $('.posts .owl-carousel').owlCarousel({
        items: 3,
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        navText: ['<span class="ion-chevron-left"></span>',
            '<span class="ion-chevron-right"></span>'],
        mouseDrag: false,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });


    // YouTubePopUp
    $("a.vid").YouTubePopUp();


    // progress bar
    wind.on('scroll', function () {
        $(".skills-progress span").each(function () {
            var bottom_of_object =
                $(this).offset().top + $(this).outerHeight();
            var bottom_of_window =
                $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if (bottom_of_window > bottom_of_object) {
                $(this).css({
                    width: myVal
                });
            }
        });
    });


    // Tabs
    $(".tabs").on("click", "li", function () {

        var myID = $(this).attr("id");

        $(this).addClass("active").siblings().removeClass("active");

        $(".tabs .item").slideUp();

        $("#" + myID + "-content").slideDown();

    });


    // counterUp
    $('.numbers .counter').counterUp({
        delay: 10,
        time: 1500
    });


    // stellar
    wind.stellar();


    // isotope
    $('.gallery').isotope({
        // options
        itemSelector: '.items'
    });

    var $gallery = $('.gallery').isotope({
        // options
    });

    // filter items on button click
    $('.filtering').on('click', 'span', function () {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({ filter: filterValue });

    });

    $('.filtering').on('click', 'span', function () {

        $(this).addClass('active').siblings().removeClass('active');

    });


    // magnificPopup
    $('.portfolio .link').magnificPopup({
        delegate: 'a',
        type: 'image'
    });


    // accordion
    $(".accordion").on("click", ".title", function () {

        $(this).next().slideDown();

        $(".accordion-info").not($(this).next()).slideUp();

    });


    // Granim
    var granimInstance = new Granim({
        element: '#canvas-basic',
        name: 'basic-gradient',
        direction: 'left-right',
        opacity: [1, 1],
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#AA076B', '#61045F'],
                    ['#02AAB0', '#00CDAC'],
                    ['#DA22FF', '#9733EE']
                ]
            }
        }
    });

});

$(window).on("load", function () {

    // Preloader
    $(".loading").fadeOut(500);


    // contact form
    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                    }
                }
            });
            return false;
        }
    });

});

jQuery(function () {
    jQuery("#bgndVideo").YTPlayer();
});
