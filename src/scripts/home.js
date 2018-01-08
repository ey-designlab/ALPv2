$(document).ready(function () {

    var downarrow = $(".scroll");
    var body = $('html, body');
    downarrow.on("click", function (e) {
        e.preventDefault();
        body.stop(true, false).animate({
            scrollTop: 870
        }, 500);
    });



    setTimeout(function () {

        $("#carousel").featureCarousel({
            trackerSummation: false,
            carouselSpeed: 600,
            autoPlay: 7000,
            pauseOnHover: true,
            animationEasing: "easeInOutCirc"
        });

    }, 600);

    function getPageScroll() {


        var yScroll;
        if (self.pageYOffset) {
            yScroll = self.pageYOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {
            yScroll = document.documentElement.scrollTop;
        } else if (document.body) {
            yScroll = document.body.scrollTop;
        }
        return yScroll;
    }

    //paralax efect for first section 
    var $bgobj = $('.page1');
    $(window).on("load scroll resize", function () {


        var scrollY = getPageScroll();
        var yPos = (scrollY * 0.2);
        var coords = '50% ' + -yPos + 'px';
        $bgobj.css({
            backgroundPosition: coords
        });
    });
        
    var Ajax2 = function (url) {
        return $.ajax({
            url: url,
            headers: {"Accept": "application/json; odata=verbose"},
            async: true,
            dataType: "json",
            crossDomain: true,
            xhrFields: {withCredentials: true}
        }).fail(function (xhr) {
//            alert('Error: ' + xhr.responseText);
        });
    };
    var Next2 = function (url) {
        $.when(Ajax2(url)).then(function (data) {
//            console.log(data);
            $.each(data.d.results, function (key, data) {

                var image = '';
                var FileName = '';

                $.each(data.AttachmentFiles.results, function (key, data) {
                    image = data.ServerRelativeUrl;
                    FileName = data.FileName;
                });

                $('#carousel').append(
                        '<div class="carousel-feature">'
                        + '<a target="_blank" href="' + data.URL + '">'
//                        + '<img class="carousel-image" src="https://share.ey.net' + image + '">'
                        + '<img class="carousel-image" src="assets/sliderimages/' + FileName + '">'
                        + '<div class="clickherewrap">'
                        + '<img class="click_here" alt="Image Caption" src="assets/css/click_here_info.png">'
                        + '<img class="click_here_shad" alt="Image Caption" src="assets/css/click_here_shad.png">'
                        + '</div>'
                        + '</a>'
                        + '<div class="carousel-caption">' + data.Description + '</div>'
                        + '</div>'
                        );
            });
        });
    };
    
    //good one
    Next2("https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('Whats_new')/items?$select=Title,ID,Description,URL,Attachments,AttachmentFiles&$expand=AttachmentFiles");
    
    //local
//    Next2("slider.json"); 
    
    
//    Next2("https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('Whats_new')/items?$top=1000");
//    Next("../src.json");

//Next("https://share.ey.net/sites/alp/_api/web/Lists/getByTitle('Courses')/items?$filter=(Learning_x0020_Journey_x0020_nam eq 'Welcome to Advisory Foundation') or (Learning_x0020_Journey_x0020_nam eq 'Welcome to Advisory Executive')");


});