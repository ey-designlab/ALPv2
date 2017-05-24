
$(document).ready(function () {
    //  https://msdn.microsoft.com/en-us/library/office/jj860569.aspx

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
        $('.capability').show().find('.selectrankwrap').show();
        $('.activeradio input').removeAttr('checked');
        $('.capabilityitem').removeClass('activeradio');
        $('.results').hide();
    });

    $('.nextslide').on('click', function (e) {
        e.preventDefault();
        if ($(this).parent().find('.capabilityitem').hasClass('activeradio')) {
            animatenext.call(this);
        }
    });

    $('.previous').on('click', function (e) {
        e.preventDefault();
        $(this).parent().find('.activeradio input').removeAttr('checked');
        $(this).parent().find('.capabilityitem').removeClass('activeradio');
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
        var dataattr = $(this).data("wrapname");
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
                $(this).find('.activeradio input').trigger("click");
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
            console.log(data)
            $.each(data.d.results, function (key, data) {
                var type;

                if (data.Learning_x0020_type !== null) {
                    type = data.Learning_x0020_type.results;
                } else {
                    type = "";
                }

                $.each(data.Division.results, function (key, dat) {
                    if (dat === "Risk") {

                        FilteredContent.push({
                            Area: data.Area.results,
                            Title: data.Title,
                            ranks: data.Rank.results,
                            Duration: data.gpqg,
                            coursecode: data.Course_x0020_Code,
                            SubServiceLine: data.Sector.results,
                            URL: data.Course_x0020_URL.Url,
                            description: data.Short_x0020_description,
                            Division: data.Division.results,
                            Sector: data.Sector.results,
                            CourseType: type,
                            RiskCapabilities: data.Risk_x0020_Capabilities_x0020__x.results,
                            PiCapabilities: data.PI_x0020_Capabilities_x0020__x00.results,
                            RiskServiceOfferings: data.Risk_x0020_Service_x0020_Offerin.results,
                            PIServiceOfferings: data.PI_x0020_Service_x0020_Offerings.results,
                            LearningJourneyname: data.Learning_x0020_Journey_x0020_nam.results,
                            CourseLevel: data.Course_x0020_Level.results,
                            Region: data.Region.results,
                            Competency: data.Consultancy_x0020_Competency.results

                        });
                    }
                });
            });


            var afterFilter = function (result, jQ) {
                $('#total').text(result.length);

            };

            var bla = function (result, jQ) {
                $('.greywrap').on('click', function (e) {
                    $('.greywrap').not(this).removeClass('activedesc').find('.greydescription').slideUp();

                    if ($(this).hasClass('activedesc')) {
                        $(this).removeClass('activedesc').find('.greydescription').slideUp();
                    } else {
                        $(this).addClass('activedesc').find('.greydescription').slideDown();
                    }
                });

                $('.courseduration').each(function () {
                    var courseduration = $(this).html();
                    var arraystuff = secondsToString(courseduration);
                    var string = arraystuff.toString();
                    $(this).html(string);
                });
            };

            var FJS = FilterJS(FilteredContent, '#results', {
                template: '#list',

                callbacks: {
                    afterFilter: afterFilter,
                    afterAddRecords: bla
                }
            });

            FJS.addCriteria({field: 'ranks', ele: '#ranks input:radio'});
            FJS.addCriteria({field: 'RiskCapabilities', ele: '#RiskCapabilities input:radio'});
            FJS.addCriteria({field: 'RiskServiceOfferings', ele: '.RiskServiceOfferings input:radio'});
            window.FJS = FJS;

        });
    };
    Next("src.json");
//    Next("https://share.ey.net/sites/playyourpart/_api/web/Lists/getByTitle('Courselistnew')/items?$filter=Division eq 'Risk'");
// Next("https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('ALP_v2')/items?$top=1000");
});


