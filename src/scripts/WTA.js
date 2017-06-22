
$(document).ready(function () {

    var pageheight;
    var submenu = $('#submenu');

    $('#dropdown').mouseenter(function () {
        submenu.stop(true, true).fadeIn();
    }).mouseleave(function () {
        submenu.stop(true, true).fadeOut();
    });

    var body = $('html, body');
    fishishedanimation = true;


    function getPageScroll() {
        var yScroll;
        if (document.documentElement && document.documentElement.scrollTop) {
            yScroll = document.documentElement.scrollTop;
        } else if (document.body) {
            yScroll = document.body.scrollTop;
        }
        return yScroll;
    }

    $(window).on("load scroll resize", function () {
        pageheight = $('.home').height();


        var starterData = {
            size: {
                width: $(".results .row").width()
            }
        };
        doResize(null, starterData);
    });

//responsive map
    var $el = $(".maps");
    var elWidth = $el.outerWidth();


    function doResize(event, ui) {
        var scale;
        scale = Math.min(
                ui.size.width / elWidth
                );
        $el.css({
            transform: "translate(0%, 0%) " + "scale(" + scale + ")"
        });

    }

    $('.click1').on('click', function (e) {
        $('.mapone').find('input').trigger("click");
        var call = $('.mapone');
        aniamteMaps.call(call);
    });
    $('.click2').on('click', function (e) {
        $('.maptwo').find('input').trigger("click");
        var call = $('.maptwo');
        aniamteMaps.call(call);
    });

    $('#LearningJourneyname .capabilityitem').on('click', function (e) {
        aniamteMaps.call(this);
    });



    function aniamteMaps() {
        if (fishishedanimation) {
            if ($(this).hasClass('mapone')) {
                $('.results').removeClass('Executive');
                $('.Foundationwrap').fadeIn();
                $('.Executivewrap').fadeOut();
            } else {
                $('.results').addClass('Executive');
                $('.Foundationwrap').fadeOut();
                $('.Executivewrap').fadeIn();
            }


            if (pageheight > getPageScroll())
                body.stop(true, false).animate({
                    scrollTop: pageheight - 115
                }, 500);

            $('#LearningJourneyname .capabilityitem').removeClass('activeradio');
            $(this).addClass('activeradio');
            
            $('.results').show().animate({
                height: 700
            }, 600, "easeInOutBack");

            $('.pointer:visible').css({"top": "", "opacity": 0});
        }
    }



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
//        console.log(result)
        return result;
    }


    var FilteredContent = [];

    var Ajax = function (url) {
        return $.ajax({
            url: url,
            headers: {"Accept": "application/json; odata=verbose"},
            async: true,
            dataType: "json",
            crossDomain: true,
            xhrFields: {withCredentials: true}
        }).fail(function (xhr) {
            alert('Error: ' + xhr.responseText);
        });
    };
    var Next = function (url) {
        $.when(Ajax(url)).then(function (data) {

            $.each(data.d.results, function (key, data) {
                var triger = 0;

                for (var key in data) {
                    if (data[key] === null && key !== 'Title' && key !== 'gpqg' && key !== 'Course_x0020_Code' && key !== 'Short_x0020_description' && key !== 'America_x0027_s_x0020_classroom_' && key !== 'America_x0027_s_x0020_AA_x0020_C' && key !== 'Blended_x0020_learning_x0020_pro') {
                        data[key] = {results: [""]};
                    } else if (data[key] === null && key === 'Course_x0020_URL') {
                        data[key] = {Url: ""};
                    }
                }

                if (data.Learning_x0020_Journey_x0020_nam !== null) {
                    $.each(data.Learning_x0020_Journey_x0020_nam.results, function (key, dat) {
                        if (dat === "Welcome to Advisory Executive" || dat === "Welcome to Advisory Foundation") {
                            if (triger === 0) {
                                FilteredContent.push({
                                    Area: data.Area.results,
                                    SubServiceLine: data.Sector.results,
                                    ranks: data.Rank.results,
                                    Division: data.Division.results,
                                    RiskCapabilities: data.Risk_x0020_Capabilities_x0020__x.results,
                                    PiCapabilities: data.PI_x0020_Capabilities_x0020__x00.results,
                                    RiskServiceOfferings: data.Risk_x0020_Service_x0020_Offerin.results,
                                    PIServiceOfferings: data.PI_x0020_Service_x0020_Offerings.results,
                                    LearningJourneyname: data.Learning_x0020_Journey_x0020_nam.results,
                                    CourseLevel: data.Course_x0020_Level.results,
                                    Region: data.Region.results,
                                    Competency: data.Consultancy_x0020_Competency.results,
                                    Sector: data.Sector.results,
                                    PASPillars: data.PAS_x0020_Pillars.results,
                                    PASfferings: data.PAS_x0020__x002d__x0020_Offering.results,
                                    GrowthDrivers: data.Growth_x0020_Drivers.results,
                                    LearningType: data.Learning_x0020_Type0.results,
                                    CourseType: data.Learning_x0020_type.results,

                                    URL: data.Course_x0020_URL.Url,

                                    Title: data.Title,
                                    Duration: data.gpqg,
                                    coursecode: data.Course_x0020_Code,
                                    description: data.Short_x0020_description,
                                    America: data.America_x0027_s_x0020_classroom_,
                                    AmericaAACPE: data.America_x0027_s_x0020_AA_x0020_C,
                                    Blended: data.Blended_x0020_learning_x0020_pro
                                });
                                triger = 1;
                            }
                        }
                    });
                }
            });
            var afterFilter = function (result, jQ) {

                if (fishishedanimation) {
                    fishishedanimation = false;
                    $.when(
                            $('.pointer:visible').css({"top": ""}).each(function (i) {
                        if (!$(".results").hasClass('Executive')) {
                            $(this).find('.number').html(i + 1);
                        } else {
                            $(this).find('.number').empty();
                        }

                        $(this).stop().delay((i++) * 30).css({"top": "-=200px", "opacity": 0})
                                .animate({
                                    top: "+=200px",
                                    opacity: 1
                                }, 400, "easeInOutBack");
                    }
                    )).done(function () {
                        fishishedanimation = true;
                    });
                }

            };
            var bla = function (result, jQ) {
                 $('.courseduration').each(function () {
                    var courseduration = $(this).html();
                    var arraystuff = secondsToString(courseduration);
                    var string = arraystuff.toString();
                    $(this).html(string);
                });
                
                $('.pinwrap').on('click', function (e) {
                    $('.greywrap').not(this).removeClass('activedesc').find('.greydescription').slideUp();
                    if ($(this).hasClass('activedesc')) {
                        $(this).removeClass('activedesc').find('.greydescription').slideUp();
                    } else {
                        $(this).addClass('activedesc').find('.greydescription').slideDown();
                    }
                });
            };
            var FJS = FilterJS(FilteredContent, '#results', {
                template: '#list',
//                criterias: [ {field: 'ranks', ele: '#ranks input:radio'} ],
//                appendToContainer: appendFn,
                callbacks: {
                    afterFilter: afterFilter,
                    afterAddRecords: bla
                }
            });
            FJS.addCriteria({field: 'LearningJourneyname', ele: '#LearningJourneyname input:radio'});
            FJS.addCriteria({field: 'Competency', ele: '#Competency input:radio'});
            window.FJS = FJS;
        });
    };
    Next("src.json");
//    Next("https://share.ey.net/sites/playyourpart/_api/web/Lists/getByTitle('Courselistnew')/items?$top=1000");

//    Next("https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('Courses')/items?$filter=(Learning_x0020_Journey_x0020_nam eq 'Welcome to Advisory Foundation') or (Learning_x0020_Journey_x0020_nam eq 'Welcome to Advisory Executive')");

//    Next("https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('ALP_v2')/items?$top=1000");
});

