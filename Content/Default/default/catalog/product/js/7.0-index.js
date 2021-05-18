jQuery(document).ready(function ($) {
    "use strict"

});

var Product = function () {

    // function to initiate FlexSlider
    var runFlexSlider = function (options) {
        $(".flexslider").each(function () {
            var slider = $(this);
            var defaults = {
                animation: "slide",
                //direction: "vertical",
                animationLoop: false,
                controlNav: true,
                directionNav: false,
                slideshow: false,
                prevText: "",
                nextText: ""
            };
            var config = $.extend({}, defaults, options, slider.data("plugin-options"));
            if (typeof config.sync !== 'undefined') {
                var carousel = {
                    animation: "slide",
                    //direction: "vertical",
                    controlNav: false,
                    animationLoop: false,
                    slideshow: false,
                    prevText: "",
                    nextText: "",
                    asNavFor: slider
                };
                var configCarousel = $.extend({}, carousel, $(config.sync).data("plugin-options"));
                $(config.sync).flexslider(configCarousel);
            }
            // Initialize Slider
            slider.flexslider(config);
        });

    };

    var runZoom = function () {
        function magnify(imgID, zoom) {
            var img, glass, w, h, bw;
            img = document.getElementById(imgID);
            /*create magnifier glass:*/
            glass = document.createElement("DIV");
            glass.setAttribute("class", "img-magnifier-glass");
            /*insert magnifier glass:*/
            img.parentElement.insertBefore(glass, img);
            /*set background properties for the magnifier glass:*/
            glass.style.backgroundImage = "url('" + img.src + "')";
            glass.style.backgroundRepeat = "no-repeat";
            glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
            bw = 3;
            w = glass.offsetWidth / 2;
            h = glass.offsetHeight / 2;
            /*execute a function when someone moves the magnifier glass over the image:*/
            glass.addEventListener("mousemove", moveMagnifier);
            img.addEventListener("mousemove", moveMagnifier);
            /*and also for touch screens:*/
            glass.addEventListener("touchmove", moveMagnifier);
            img.addEventListener("touchmove", moveMagnifier);
            function moveMagnifier(e) {
                var pos, x, y;
                /*prevent any other actions that may occur when moving over the image*/
                e.preventDefault();
                /*get the cursor's x and y positions:*/
                pos = getCursorPos(e);
                x = pos.x;
                y = pos.y;
                /*prevent the magnifier glass from being positioned outside the image:*/
                if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
                if (x < w / zoom) { x = w / zoom; }
                if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
                if (y < h / zoom) { y = h / zoom; }
                /*set the position of the magnifier glass:*/
                glass.style.left = (x - w) + "px";
                glass.style.top = (y - h) + "px";
                /*display what the magnifier glass "sees":*/
                glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
            }
            function getCursorPos(e) {
                var a, x = 0, y = 0;
                e = e || window.event;
                /*get the x and y positions of the image:*/
                a = img.getBoundingClientRect();
                /*calculate the cursor's x and y coordinates, relative to the image:*/
                x = e.pageX - a.left;
                y = e.pageY - a.top;
                /*consider any page scrolling:*/
                x = x - window.pageXOffset;
                y = y - window.pageYOffset;
                return { x: x, y: y };
            }
        }

        $(".image-magnify").each(function(k,v) {
            magnify(v.id, 3);
        });
    
      
    }
    var runTabLink = function () {
        window.openPage = function (pageName, elmnt, color) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablink");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].style.backgroundColor = "";
            }
            document.getElementById(pageName).style.display = "block";
            elmnt.style.backgroundColor = color;
        }

        // Get the element with id="defaultOpen" and click on it
        document.getElementById("defaultOpen").click();
    }
    var runChangedQuantity = function () {
        /* increase or decrease item */
        var qtyPlus = $('.qty-plus');
        var qtyMinus = $('.qty-minus');
        qtyPlus.on('click', function () {
            $(this).siblings('.qty').val(parseInt($(this).siblings('.qty').val()) + 1);
        });

        qtyMinus.on('click', function () {
            if (parseInt($(this).siblings('.qty').val()) > 1) {
                $(this).siblings('.qty').val(parseInt($(this).siblings('.qty').val()) - 1);
            }
        });
    }
    var runRadio = function () {
        // radiocharm - uncheckable
        $('div.radiocharm.uncheckable input').radiocharm({
            uncheckable: true
        });
        $(".variations").css("opacity", "1");
    }
    var runFilter = function () {
        $("#filter-attr button").each(function () {

            $(this).on("click", function () {

                var filter = $(this).attr('class');

                if ($(this).attr('class') == 'all') {
                    $('.filter-item').show('fast');
                    $("#filter-attr button").removeClass('active');
                    $(this).addClass('active');
                    $("#filter-attr button").attr("disabled", false);
                    $(this).attr("disabled", true);
                }
                else {
                    $('.filter-item').hide();
                    $('.filter-item.' + filter + '').show('fast');
                    $("#filter-attr button").removeClass('active');
                    $(this).addClass('active');
                    $("#filter-attr button").attr("disabled", false);
                    $(this).attr("disabled", true);
                };

               

            });

        });
        $('figure.product-associated').imgCheckbox({
            addToForm: false,
            preselect: [""],
            "styles": {
                "span.imgCheckbox.imgChked img": {
                    // This property will overwrite the default grayscaling, we need to add it back in
                    "filter": "blur(2px) grayscale(0%)",

                    // This is just css: remember compatibility
                    "-webkit-filter": "blur(2px) grayscale(0%)",

                    // Let's change the amount of scaling from the default of "0.8"
                    "transform": "scale(0.5)"
                }
            },
            // size
            radio: true,
            onload: function () {
                // Do something fantastic!
                $('figure.product-associated').css("opacity","1");
            },
            onclick: function (el) {
                var isChecked = el.hasClass("imgChked"),
                    imgEl = el.children()[0];  // the img element
                if (isChecked == true) {
                    window.location.href = $(imgEl).attr("name") + "?refId=" + $(imgEl).attr("id");
                }
                console.log($(imgEl).attr("name"), " is now " + (isChecked ? "checked" : "not-checked") + "!");
            }

        });

        $("#filter-attr button." + $(".product-associated.selected").attr("group")).trigger("click");
    }
    return {
        init: function () {
            //runFlexSlider();
            //runZoom();
            //runTabLink();
            //runChangedQuantity();
            runRadio();
            runFilter();
        }
    };
}();
