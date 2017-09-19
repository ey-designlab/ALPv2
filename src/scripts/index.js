
var sourseUrl = "src.json";

//var sourseUrl = "https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('ALP_v2')/items?$top=1000";

//var sourseUrl = "https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('ALP')/items?$top=2000";

//var sourseUrl = "https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('alp_v3')/items?$top=2000";

//var sourseUrl = "https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('test')/items?$top=2000";

jQuery(document).ready(function ($) {



    $("#nav-icon").on('click', function () {
        $(this).toggleClass('open');
        $("#box").toggle();
    });


    var body = $('html, body');
    var downarrow = $(".scroll");

    downarrow.on("click", function (e) {
        e.preventDefault();
        body.stop(true, false).animate({
            scrollTop: pageheight - 115
        }, 500);
    });

    $(window).on("load scroll resize", function () {
        pageheight = $(window).height();
    });


    var immersionpopup = $('.immersionpopup');
    var lightbox = $(".lightbox, .close");
    var immersionpopupclick = $('.immersionpopupclick');

    immersionpopupclick.click(function (e) {
        e.preventDefault();
        lightbox.fadeIn(400);
        immersionpopup.show().animate({'top': 0, opacity: 1}, 400, "easeOutBack");
    });

    lightbox.click(function () {
        lightbox.fadeOut(400);
        immersionpopup.animate({'top': '-=300', opacity: 0}, 400, "easeInBack", function () {
            $(this).hide();
        });
    });

    var submenu = $('#submenu');

    $('#dropdown').mouseenter(function () {
        submenu.stop(true, true).fadeIn();
    }).mouseleave(function () {
        submenu.stop(true, true).fadeOut();
    });

    (function loop() {
        $('#scroll').delay(500).fadeTo(1000, 0.2).fadeTo(1000, 1, loop);
    })();

    $('#menu').append('<li class="slide-line"><div class="slide-line-top"></div></li>');

    function AnimatingMenuLine() {
        var $this = $(this);
        offset = $this.offset(),
                offsetBody = $('#box').offset();
        $('#menu .slide-line').stop().animate({
            width: $this.outerWidth() + 'px',
            left: (offset.left - offsetBody.left) + 'px'
        }, 200, "easeInOutCubic");
    }

    $('#menu > li > a').mouseenter(function () {
        AnimatingMenuLine.call(this);
    });


//
//    (function () {
//        $('html,body').animate({
//            scrollTop: 0
//        }, 0);
//    })();


    //animate to anhor tag when menu is clicked
    // $('a[href*=#]:not([href=#],[href*=#tab])').on('click', function (e) {
//    $('a[href*=#page]').on('click', function (e) {
//        e.preventDefault();
//        var target = $(this.hash);
//        var distance = (target.offset().top) + 2;
//        if (target.length) {
//            $('html,body').stop(true, false).animate({
//                scrollTop: distance
//            }, 1500, 'easeInOutCubic');
//            return false;
//        }
//    });


    //menu on click animate window to anchor 
//    $('a[href*=#]:not([href=#],[href*=#tab])').click(function () {
//        var target = $(this.hash);
//        var distance = (target.offset().top) + 1;
//        if (target.length) {
//            $('html,body').animate({
//                scrollTop: distance
//            }, 1500, 'easeInOutCubic');
//            return false;
//        }
//    });





//    //first set firstname equal to Sparky.
//    localStorage.setItem("firstname", "Sparky");
////next, get the value of firstname (hint, it will be Sparky).
//    localStorage.getItem("firstname");






//
//    //setting cookie
//    function setCookie(cname, cvalue, exdays) {
//        var d = new Date();
//        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//        var expires = "expires=" + d.toGMTString();
//        document.cookie = cname + "=" + cvalue + "; " + expires;
//    }
//
////get Cookie
//    function getCookie(cname) {
//        var name = cname + "=";
//        var ca = document.cookie.split(';');
//        for (var i = 0; i < ca.length; i++)
//        {
//            var c = ca[i].trim();
//            if (c.indexOf(name) == 0)
//                return c.substring(name.length, c.length);
//        }
//        return "";
//    }
//
////check if cookie is set then do nothing if not show form
//
//
//    function populateStorage() {
//        var Cookie = getCookie("easyread");
//        if (Cookie === "true") {
//            setCookie("easyread", "false", 30);
//            setStyles();
//        } else {
//            setCookie("easyread", "true", 30);
//            setStyles();
//        }
//    }
//
//    function setStyles() {
//        var Cookie = getCookie("easyread");
//        if (Cookie === "true") {
//            runslick();
//            $('link[href="css/main.css"]').attr('href', 'css/easyread.css');
//            $('link[href="../css/main.css"]').attr('href', '../css/easyread.css');
//            $('link[href="../../css/main.css"]').attr('href', '../../css/easyread.css');
//        } else {
//            runslick();
//            $('link[href="css/easyread.css"]').attr('href', 'css/main.css');
//            $('link[href="../css/easyread.css"]').attr('href', '../css/main.css');
//            $('link[href="../../css/easyread.css"]').attr('href', '../../css/main.css');
//        }
//    }
//
//    setStyles();

    $('.blended-togle input').on('click', function () {
        if ($(this).is(":checked")) {
            $('.capability').hide();
            $('.results').show();
            $('.activeradio input').removeAttr('checked');
            $('.capabilityitem').removeClass('activeradio');
            $('.previosslide').removeClass('previosslide');

            $('.capability').find('.hide').hide();
            $('.checkbox').css({"top": "", "opacity": ""});
            $('.selectareawrap').show();

        } else {
            $('.results').hide();
            $('.capability').show();
        }
    });


// learning journeys code



    $('.finish').on('click', function (e) {
        e.preventDefault();
        if ($(this).parent().find('.capabilityitem').hasClass('activeradio')) {
            sumary();
            $('.YOURSELECTIONSUMMARY').fadeIn();
            $('.capability').hide();
            $('.results').slideDown();

            var target = $(".results");
            var distance = (target.offset().top) - 115;
            $('html,body').stop(true, false).animate({
                scrollTop: distance
            }, 1500, 'easeInOutCubic');
        }
    });

    $('.reset').on('click', function (e) {
        e.preventDefault();
        $('.YOURSELECTIONSUMMARY').hide().find('.selectedfilters').empty();
        $('#total').empty();
        $('.checkbox').css({"top": "", "opacity": ""});
        $('.capability').show().find('.selectareawrap').show();
        $('.Account_Topics').show().find('.selectrankwrap').show();
        $('.activeradio input').removeAttr('checked');
        $('.capabilityitem').removeClass('activeradio');
        $('.results').hide();
        $('.previosslide').removeClass('previosslide');
    });

    $('.nextslide').on('click', function (e) {
        e.preventDefault();
//        $('.previosslide').removeClass('previosslide');
        if ($(this).parent().find('.capabilityitem').hasClass('activeradio')) {
            $(this).parent().addClass('previosslide');
            animatenext.call(this);
        }
    });

    $('.previous').on('click', function (e) {
        e.preventDefault();
        animateprew.call(this);
    });

    function sumary() {
        $('.activeradio').each(function () {
            var capabilityitem = $(this).clone();
            capabilityitem.find('input').remove();
            $('.YOURSELECTIONSUMMARY .selectedfilters').append(capabilityitem);
        });
    }

    function animateprew() {
        $(this).parent().find('.activeradio input').removeAttr('checked');
        $(this).parent().find('.capabilityitem').removeClass('activeradio');
        FJS.setTemplate('#list', true);

//        var dataattr = $(this).data("wrapname");
        var parent = $(this).parent();
        $.when(
                $(this).parent().find('.checkbox').each(function (i) {
            $(this).css({"top": 0, "opacity": 1, 'position': 'relative'}).delay((i++) * 100)
                    .animate({
                        top: -200,
                        opacity: 0
                    }, 400, "easeInOutBack");
        })).done(function () {
            parent.hide();
//            $('.' + dataattr).fadeIn().find('.checkbox').each(function (i) {
            $('.previosslide').last().fadeIn().find('.checkbox').each(function (i) {
                $(this).parents('.previosslide').removeClass('previosslide');
//                console.log($(this).find('.activeradio input'));
//                $(this).find('.activeradio input').trigger("click");
                $(this).css({"top": -200, "opacity": 0, 'position': 'relative'}).delay((i++) * 50)
                        .animate({
                            top: 0,
                            opacity: 1
                        }, 400, "easeInOutBack");
            });
        });
    }

    function animatenext() {
        var dataattr = $(this).parent().find('.activeradio > input').data("wrapname");
        var parent = $(this).parent();
        $.when(
                $(this).parent().find('.checkbox').each(function (i) {
            $(this).css({"top": 0, "opacity": 1, 'position': 'relative'}).delay((i++) * 100)
                    .animate({
                        top: -200,
                        opacity: 0
                    }, 400, "easeInOutBack");
        })).done(function () {
            parent.hide();
            $('.' + dataattr).fadeIn().find('.checkbox').each(function (i) {
                $(this).css({"top": -200, "opacity": 0, 'position': 'relative'}).delay((i++) * 50)
                        .animate({
                            top: 0,
                            opacity: 1
                        }, 400, "easeInOutBack");
            });
        });
    }

    $('.capabilityitem').on('click', function (e) {
        var parents = $(this).parents('fieldset');
        parents.find('.capabilityitem').removeClass('activeradio');
        var nextslide = parents.parent().find('.nextslide').addClass('animatenext');
        setTimeout(function () {
            nextslide.removeClass('animatenext');
        }, 400);
        $(this).addClass('activeradio');
    });
    $(function () {
        $(document).tooltip({
            track: true
        });
    });

});




function secondsToString(seconds) {
    var value = seconds;
    var units = {
        "hour": 60,
        "minute": 1
    };
    var result = [];
    for (var name in units) {
        var p = Math.floor(value / units[name]);

        if (p == 1)
            result.push(" " + p + " " + name);
        if (p >= 2)
            result.push(" " + p + " " + name + "s");

        value %= units[name];
    }
    return result;
}