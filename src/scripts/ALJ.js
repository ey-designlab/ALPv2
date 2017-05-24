
$(document).ready(function () {

    var count1, count2;
    var body = $('html, body');
 
   
    $(window).on("load scroll resize", function () {
        pageheight = $(window).height();
    });


    $('#Competency .capabilityitem').on('click', function (e) {

        $('#Competency .capabilityitem').removeClass('activeradio');
        $(this).addClass('activeradio');
        count1 = true;
        if (count1 && count2) {
            animate();
        }

        var target = $(".results");
        var distance = (target.offset().top) - 115;
        $('html,body').stop(true, false).animate({
            scrollTop: distance
        }, 1500, 'easeInOutCubic');


    });
    $('#ranks .capabilityitem').on('click', function (e) {
        var parents = $(this).parents('fieldset');
        var nextslide = parents.parent().find('.nextslide').addClass('animatenext');
        setTimeout(function () {
            nextslide.removeClass('animatenext');
        }, 400);
        
        count2 = true;
        $('#ranks .capabilityitem').removeClass('activeradio');
        $(this).addClass('activeradio');
        if (count1 && count2) {
            animate();
        }
    });

    $('#nextslide').on('click', function (e) {
        e.preventDefault();

        body.stop(true, false).animate({
            scrollTop: pageheight - 115
        }, 200);

        if ($(this).parent().find('.capabilityitem').hasClass('activeradio')) {
            $.when(
                    $(this).parent().find('.checkbox').each(function (i) {
                $(this).css({"top": 0, "opacity": 1, 'position': 'relative'}).delay((i++) * 100)
                        .animate({
                            top: -200,
                            opacity: 0
                        }, 400, "easeInOutBack");
            })).done(function () {
                $('.selectrankwrap').animate({
                    top: -200,
                    opacity: 0,
                    height: 0
                }, 400, "easeInOutBack");
                $('.competancywtrap').css({"top": 0, "opacity": 1, height: 'inherit'}).fadeIn().parent().find('.checkbox').each(function (i) {
                    $(this).css({"top": -200, "opacity": 0, 'position': 'relative'}).delay((i++) * 50)
                            .animate({
                                top: 0,
                                opacity: 1
                            }, 400, "easeInOutBack");
                });

            });
        }
    });

    $('#prewslide').on('click', function (e) {
        e.preventDefault();
        body.stop(true, false).animate({
            scrollTop: pageheight - 115
        }, 200);
        $.when(
                $(this).parent().find('.checkbox').each(function (i) {
            $(this).css({"top": 0, "opacity": 1, 'position': 'relative'}).delay((i++) * 50)
                    .animate({
                        top: -200,
                        opacity: 0
                    }, 400, "easeInOutBack");
        })).done(function () {
            $('.competancywtrap').animate({
                top: -200,
                opacity: 0,
                height: 0
            }, 400, "easeInOutBack");

            $('.selectrankwrap').fadeIn().css({"top": 0, "opacity": 1, height: 'inherit'}).parent().find('.checkbox').each(function (i) {
                $(this).css({"top": -400, "opacity": 0, 'position': 'relative'}).delay((i++) * 100)
                        .animate({
                            top: 0,
                            opacity: 1
                        }, 400, "easeInOutBack");
            });

        });

    });




    animate = function () {
        $('.results').slideDown();
    };

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
                var type;

                if (data.Learning_x0020_type !== null) {
                    type = data.Learning_x0020_type.results;
                } else {
                    type = "";
                }

                FilteredContent.push({
                    Title: data.Title,
                    ranks: data.Rank.results,
                    coursecode: data.Course_x0020_Code,
                    SubServiceLine: data.Sector.results,
                    URL: data.Course_x0020_URL.Url,
                    description: data.Short_x0020_description,
                    Sector: data.Sector.results,
                    CourseType: type,
                    LearningJourneyname: data.Learning_x0020_Journey_x0020_nam.results,
                    CourseLevel: data.Course_x0020_Level.results,
                    Competency: data.Consultancy_x0020_Competency.results

                });
            });


            var afterFilter = function (result, jQ) {

            };

            var bla = function (result, jQ) {
                $('.greywraptitle').on('click', function (e) {
                    $('.greywraptitle').not(this).removeClass('activedesc').parent().find('.greydescription').slideUp();

                    if ($(this).hasClass('activedesc')) {
                        $(this).removeClass('activedesc').parent().find('.greydescription').slideUp();
                    } else {
                        $(this).addClass('activedesc').parent().find('.greydescription').slideDown();
                    }
                });
            };

            var FJS = FilterJS(FilteredContent, '#results', {
                template: '#list',
//                appendToContainer: appendFn,
                callbacks: {
                    afterFilter: afterFilter
                }
            });

            var FJS2 = FilterJS(FilteredContent, '#results2', {
                template: '#list2',
                callbacks: {
                }
            });

            var FJS3 = FilterJS(FilteredContent, '#results3', {
                template: '#list3',
                callbacks: {
                }
            });

            var FJS4 = FilterJS(FilteredContent, '#results4', {
                template: '#list4',
                callbacks: {
                    afterAddRecords: bla
                }
            });



            FJS.addCriteria({field: 'ranks', ele: '#ranks input:radio'});
            FJS.addCriteria({field: 'Competency', ele: '#Competency input:radio'});
            window.FJS = FJS;

        });
    };
    Next("src.json");
//    Next("https://share.ey.net/sites/playyourpart/_api/web/Lists/getByTitle('Courselistnew')/items?$top=1000");
// Next("https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('ALP_v2')/items?$top=1000");
});

