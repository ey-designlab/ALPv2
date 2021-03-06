

$(document).ready(function () {
    //  https://msdn.microsoft.com/en-us/library/office/jj860569.aspx

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
//            console.log(data)
            $.each(data.d.results, function (key, data) {
                for (var key in data) {
                    if (data[key] === null && key !== 'Title' && key !== 'gpqg' && key !== 'Course_x0020_Code' && key !== 'Short_x0020_description' && key !== 'America_x0027_s_x0020_classroom_' && key !== 'America_x0027_s_x0020_AA_x0020_C' && key !== 'Blended_x0020_learning_x0020_pro') {
                        data[key] = {results: [""]};
                    } else if (data[key] === null && key === 'Course_x0020_URL') {
                        data[key] = {Url: ""};
                    }
                }

                $.each(data.Division.results, function (key, dat) {
                    if (dat === "PAS") {
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
                            PASPillarOfferings: data.temp.results,

                            URL: data.Course_x0020_URL.Url,

                            Title: data.Title,
                            Duration: data.gpqg,
                            coursecode: data.Course_x0020_Code,
                            description: data.Short_x0020_description,
                            America: data.America_x0027_s_x0020_classroom_,
                            AmericaAACPE: data.America_x0027_s_x0020_AA_x0020_C,
                            Blended: data.Blended_x0020_learning_x0020_pro
                        });
                    }
                });
            });

            var afterFilter = function (result, jQ) {
                $('#total').text(result.length);
            };

            var bla = function (result, jQ) {
//                $("#Divisiontrigger").trigger("click");

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
            FJS.addCriteria({field: 'Division', ele: '#Divisiontrigger'});
            FJS.addCriteria({field: 'Blended', ele: '#Blended'});

            FJS.addCriteria({field: 'Area', ele: '#area input:radio'});
            FJS.addCriteria({field: 'Region', ele: '.regions input:radio'});
            FJS.addCriteria({field: 'ranks', ele: '#ranks input:radio'});
//            FJS.addCriteria({field: 'ranks', ele: '#PASCapabilities input:radio'});
            FJS.addCriteria({field: 'PASfferings', ele: '#PASSERVICEOFFERINGS input:radio'});
            FJS.addCriteria({field: 'PASPillars', ele: '#PASPillars input:radio'});
            FJS.addCriteria({field: 'PASPillarOfferings', ele: '.PASPillarOfferings input:radio'});
            window.FJS = FJS;
        });
    };
    Next(sourseUrl);
//    Next("https://share.ey.net/sites/playyourpart/_api/web/Lists/getByTitle('Courselistnew')/items?$filter=Division eq 'Risk'");
// Next("https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('ALP_v2')/items?$top=1000");



    var Next2 = function (url) {
        $.when(Ajax(url)).then(function (data) {
           
            var count = 0;
            $.each(data.d.results, function (key, data) {
                for (var key in data) {
                    if (data[key] === null && key !== 'Title' && key !== 'gpqg' && key !== 'Course_x0020_Code' && key !== 'Short_x0020_description' && key !== 'America_x0027_s_x0020_classroom_' && key !== 'America_x0027_s_x0020_AA_x0020_C' && key !== 'Blended_x0020_learning_x0020_pro') {
                        data[key] = {results: [""]};
                    } else if (data[key] === null && key === 'Course_x0020_URL') {
                        data[key] = {Url: ""};
                    }
                }

                $.each(data.Learning_x0020_Journey_x0020_nam.results, function (i, dat) {

                    if (dat === "Welcome to PAS") {
                        count++;
                        var CourseType;
                        var Sector;

                        $.each(data.Learning_x0020_type.results, function (key, data) {
                            CourseType = data;
                        });
                        $.each(data.Sector.results, function (key, data) {
                            Sector = data;
                        });

                        $('#resultss').append(
                                '<div id="fjss_' + count + '" class="pointer">'
                                + '<div class="number"></div>'
                                + '<div class="smallcyrkle">'
                                + '<div class="rotatedline"></div>'
                                + '<div class="strightline"></div>'
                                + '<div class="cyrcklecontent">'
                                + '<div class="pinwrap clearfix">'
                                + '<div class="colorbar"></div>'
                                + '<div class="greywraptitle">' + data.Title + '</div>'
                                + '<div class="greydescription">'
                                + '<div class="pad2">'
                                + '<div class="xx"></div>'
                                + '<div class="xy"></div>'
                                + '<div class="yx"></div>'
                                + '<div class="yy"></div>'
                                + data.Short_x0020_description
                                + '<a class="learnmoregreen" target="_blank" href="' + data.Course_x0020_URL.Url + '">Launch Now</a>'
                                + '</div>'
                                + '</div>'
                                + '<div class="learnmoreinbox">Learn More</div>'
                                + '<div class="clearfix pad">Course type:<div class="padedwidth ">' + CourseType + '</div></div>'
                                + '<div class="clearfix pad">Course code:<div class="padedwidth ">' + data.Course_x0020_Code + '</div></div>'
                                + '<div class="clearfix pad">Sector: <div class="padedwidth clearfix">' + Sector + '</div></div>'
                                + '<div class="clearfix pad">Course Duration:<div class="padedwidth clearfix courseduration">' + data.gpqg + '</div></div>'
                                + '</div>'
                                + '</div>'
                                + '</div>'
                                + '</div>'
                                );
                    }
                });
            });

            $('.pinwrap').on('click', function (e) {
                $('.greywrap').not(this).removeClass('activedesc').find('.greydescription').slideUp();
                if ($(this).hasClass('activedesc')) {
                    $(this).removeClass('activedesc').find('.greydescription').slideUp();
                } else {
                    $(this).addClass('activedesc').find('.greydescription').slideDown();
                }
            });

        });



    };
    Next2(sourseUrl);




});


