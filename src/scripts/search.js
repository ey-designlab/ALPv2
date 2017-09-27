$(document).ready(function () {

    var filtergroopstitle = $('.filtergroops .title');

    filtergroopstitle.on('click', function (e) {
        $('.filtergroops').find('.filterwrap').hide();
        filtergroopstitle.removeClass('activefilter');

        $(this).addClass('activefilter')
                .parent().find('.filterwrap').css({left: 280, opacity: 0}).show()
                .animate({left: 321, opacity: 1}, 400, 'easeOutBack');
    });

    $('.filterwrapoclose').on('click', function (e) {
        $(this).parent().fadeOut();
        filtergroopstitle.removeClass('activefilter');
    });

//AmericaAACPE tickbox
    $('#Area input[type=checkbox][value=Americas]').on('click', function (e) {
        var AmericaAACPE = $('.AmericaAACPE');
        var tick = AmericaAACPE.find('input');
        var checkbox = $(this).parents('.checkbox');

        if ($(this).is(":checked")) {
            checkbox.animate({"padding-bottom": 35});
            AmericaAACPE.fadeIn();
        } else {
            checkbox.animate({"padding-bottom": 3});
            AmericaAACPE.fadeOut();
            if (tick.prop('checked', true)) {
                tick.trigger("click");
            }
            AmericaAACPE.fadeOut();
        }
    });


    var Risktick = $('#SubServiceLine').find('input[value="Risk"]');
    var PItick = $('#SubServiceLine').find('input[value="PI"]');
    var RiskWrap = $('#RiskCapabilities, #RiskServiceOfferings').parent();
    var PiWrap = $('#PiCapabilities, #PIServiceOfferings').parent();

    //    var PAStick = $('#Division').find('input[value="PAS"]');
    //    var PASWrap = $('#PASfferings, #PASPillarOfferings').parent();

    Risktick.on("click", function () {
        if (PItick.is(":checked") && Risktick.is(":checked") || PItick.is(":not(:checked)") && Risktick.is(":not(:checked)")) {
            RiskWrap.show();
            PiWrap.show();
        } else if (Risktick.is(":not(:checked)") && PItick.is(":checked")) {
            RiskWrap.hide();
            PiWrap.show();
        } else {
            RiskWrap.show();
            PiWrap.hide();
        }
    });

    PItick.on("click", function () {
        if (PItick.is(":checked") && Risktick.is(":checked") || PItick.is(":not(:checked)") && Risktick.is(":not(:checked)")) {
            RiskWrap.show();
            PiWrap.show();
        } else if (PItick.is(":not(:checked)") && Risktick.is(":checked")) {
            RiskWrap.show();
            PiWrap.hide();
        } else {
            RiskWrap.hide();
            PiWrap.show();
        }
    });


    MainArr = [];

    var fieldset = $('fieldset');

    var AppliedFiltersOBJ = {};

    $('.filterwrap input').on('click', function (e) {
        $('.appyedfilters').empty().slideDown();
        AppliedFiltersOBJ = {};
        fieldset.each(function (i) {
            var fieldsetname = $(this).find('legend').text();
            var fieldsetID = $(this).attr('id');
            if ($(this).find('input').is(":checked")) {
                if ($('.clearall').length > 0) {
                } else {
                    $('.appyedfilters').append('<div class="clearall">CLEAR ALL FILTERS</div>');
                }
                $('.appyedfilters').append('<div class="' + fieldsetID + '">'
                        + '<div class="fieldsetname">' + fieldsetname + ': </div></div>');
                var Obj = [];
                $(this).find('input:checked').each(function (j) {
                    var fieldvalue = $(this).attr('value');
                    $('.' + fieldsetID).append('<span>' + fieldvalue + '</span>');
                    Obj.push(fieldvalue);
                });
                AppliedFiltersOBJ[fieldsetID] = Obj;
            }
        });

//        WhriteTOStorage();

        $('.clearall').on('click', function (e) {
            $('fieldset input:checked').each(function (j) {
                $(this).trigger("click");
            });
        });

        $('.appyedfilters span').on('click', function (e) {
            var fieldvalue = $(this).text();
            var fieldsetname = $(this).parent().attr('class');
            $('#' + fieldsetname).find('input[value="' + fieldvalue + '"]').trigger("click");
        });

    });


//    function WhriteTOStorage() {
//// Put the object into storage
//        localStorage.setItem('AppliedFilters', JSON.stringify(AppliedFiltersOBJ));
//    }
//
//    function ReadFromStorage() {
//
//
//        // Retrieve the object from storage  var retrievedObject = localStorage.getItem('AppliedFilters');
//        var retrievedObject = localStorage.getItem('AppliedFilters');
//        var parsed = JSON.parse(retrievedObject);
//
//        $.each(parsed, function (key, data) {
//            $(data).each(function () {
//                setTimeout(function () {
//                    $('#' + key).find('input[value="' + this + '"]').trigger("click");
//                }, 400);
//
////                console.log(key);
//            });
////            console.log(key, data);
//
//        });
////        var fieldvalue = $(this).text();
////        var fieldsetname = $(this).parent().attr('class');
////        
////        $('#' + fieldsetname).find('input[value="' + fieldvalue + '"]').trigger("click");
//
////        console.log(parsed);
////        console.log(retrievedObject);
//    }
//    ReadFromStorage();

    initSliders();

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
            console.log('fail fetch' + xhr);
        });
    };
    var Next = function (url) {
        $.when(Ajax(url)).then(function (data) {
            console.log(data)
            $.each(data.d.results, function (key, data) {
                for (var key in data) {
                    if (data[key] === null && key !== 'Title' && key !== 'gpqg' && key !== 'Course_x0020_Code' && key !== 'Short_x0020_description' && key !== 'America_x0027_s_x0020_classroom_' && key !== 'America_x0027_s_x0020_AA_x0020_C' && key !== 'Blended_x0020_learning_x0020_pro') {
                        data[key] = {results: [""]};
                    } else if (data[key] === null && key === 'Course_x0020_URL') {
                        data[key] = {Url: ""};
                    }
                }

                FilteredContent.push({
                    Area: data.Area.results,
//                    SubServiceLine: data.Sector.results,
                    ranks: data.Rank.results,
//                    ranks: data.Rank.results.join(', '),
                    SubServiceLine: data.Division.results,
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
                    PASPillarOfferings: data.temp.results,
                    WinningintheMarket: data.Winning_x0020_in_x0020_the_x0020.results,

                    URL: data.Course_x0020_URL.Url,

                    Title: data.Title,
                    Duration: data.gpqg,
                    coursecode: data.Course_x0020_Code,
                    description: data.Short_x0020_description,
                    America: data.America_x0027_s_x0020_classroom_,
                    AmericaAACPE: data.America_x0027_s_x0020_AA_x0020_C,
                    Blended: data.Blended_x0020_learning_x0020_pro
                });

            });

            var afterFilter = function (result, jQ) {

                $('#total').text(result.length);
                $('.counter').remove();

                $("fieldset").each(function () {
                    var IDes = $(this).attr('id');

                    $(this).find('input').each(function () {
                        var c = $(this), count = 0, ob = {};
                        ob[IDes] = c.val();
                        count = jQ.where(ob).count;
                        c.parent().find('span').append('<span class="counter"> (' + count + ')</span>')
//                        c.next().html(c.val() + '<span class="counter"> (' + count + ')</span>');
                    });
                });

            };

            var afterAddRecords = function (result, jQ) {

            };


            var FJS = FilterJS(FilteredContent, '#movies', {
                template: '#courses',
                filter_on_init: true,
//                search: {ele: '#searchbox'},
                search: {ele: '#searchbox', fields: ['Title', 'description', 'coursecode']}, // With specific fields

                callbacks: {
                    afterFilter: afterFilter,
                    afterAddRecords: afterAddRecords
                },
                pagination: {
                    container: '.pag',
                    visiblePages: 5,
                    perPage: {
                        values: [20, 50, 100],
                        container: '.per_page'
                    }
                }
            });
            FJS.addCriteria({field: 'ranks', ele: '#ranks input:checkbox'});
//            FJS.addCriteria({field: 'Division', ele: '#Division input:checkbox'});
            FJS.addCriteria({field: 'CourseType', ele: '#CourseType input:checkbox', all: 'all'});
            FJS.addCriteria({field: 'CourseLevel', ele: '#CourseLevel input:checkbox'});
            FJS.addCriteria({field: 'Area', ele: '#Area input:checkbox'});
            FJS.addCriteria({field: 'Region', ele: '#Region input:checkbox'});
            FJS.addCriteria({field: 'Sector', ele: '#Sector input:checkbox'});
            FJS.addCriteria({field: 'RiskCapabilities', ele: '#RiskCapabilities input:checkbox'});
            FJS.addCriteria({field: 'PiCapabilities', ele: '#PiCapabilities input:checkbox'});
            FJS.addCriteria({field: 'RiskServiceOfferings', ele: '#RiskServiceOfferings input:checkbox'});
            FJS.addCriteria({field: 'PIServiceOfferings', ele: '#PIServiceOfferings input:checkbox'});
            FJS.addCriteria({field: 'Competency', ele: '#Competency input:checkbox'});
            FJS.addCriteria({field: 'PASPillars', ele: '#PASPillars input:checkbox'});
            FJS.addCriteria({field: 'GrowthDrivers', ele: '#GrowthDrivers input:checkbox'});
            FJS.addCriteria({field: 'LearningType', ele: '#LearningType input:checkbox'});
            FJS.addCriteria({field: 'Blended', ele: '#Blended'});
            FJS.addCriteria({field: 'AmericaAACPE', ele: '#AmericaAACPE'});
            FJS.addCriteria({field: 'PASfferings', ele: '#PASfferings input:checkbox'});
            FJS.addCriteria({field: 'PASPillarOfferings', ele: '#PASPillarOfferings input:checkbox'});
            FJS.addCriteria({field: 'WinningintheMarket', ele: '#WinningintheMarket input:checkbox'});
            


            //            FJS.addCriteria({field: 'Division', ele: '#Division', all: 'all', selector: 'select'});
            FJS.addCriteria({field: 'SubServiceLine', ele: '#SubServiceLine input:checkbox'});
            FJS.addCriteria({field: 'Duration', ele: '#runtime_filter', type: 'range'});

            window.FJS = FJS;

            $('#one').on('click', function () {
                FJS.setTemplate('#courses2', true);
            });
            $('#two').on('click', function () {
                FJS.setTemplate('#courses', true);
            });
            $('#Blended').on('click', function () {
                if ($(this).is(":checked")) {
                    FJS.setTemplate('#blended', true);
                } else {
                    FJS.setTemplate('#courses', true);
                }
            });
        });
    };

    Next(sourseUrl);

});



function initSliders() {

    $("#runtime_slider").slider({
        min: 0,
        max: 3000,
        values: [1, 3000],
        step: 10,
        range: true,
        slide: function (event, ui) {

            var courseduration = ui.values[ 1 ];
            var arraystuff = secondsToString(courseduration);
            var string = arraystuff.toString();

            var courseduration2 = ui.values[ 0 ];
            var arraystuff2 = secondsToString(courseduration2);
            var string2 = arraystuff2.toString();

            $("#runtime_range_label").html(string2 + ' - ' + string);
            $('#runtime_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
        }
    });

}
