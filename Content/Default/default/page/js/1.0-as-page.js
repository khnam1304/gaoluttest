if ($(".about-carousel").length > 0) {
    $(".about-carousel").each(function () {
        var autoplay = ($(this).attr("data-auto-play") === "true") ? true : false;
        $(this).owlCarousel({
            items: $(this).attr("data-desktop"),
            loop: true,
            mouseDrag: true,
            navigation: true,
            dots: false,
            pagination: false,
            autoPlay: autoplay,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            smartSpeed: 1000,
            autoplayHoverPause: true,
            navigationText: ['<i class="ion-ios-arrow-thin-left"></i>', '<i class="ion-ios-arrow-thin-right"></i>'],
            itemsDesktop: [1199, $(this).attr("data-desktop")],
            itemsDesktopSmall: [979, $(this).attr("data-laptop")],
            itemsTablet: [768, $(this).attr("data-tablet")],
            itemsMobile: [479, $(this).attr("data-mobile")]
        });
    });
}