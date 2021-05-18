
jQuery(document).ready(function ($) {
    $(window).on('load', function () {
        var $container = $('.isotope-wrapper');
        $container.isotope({ itemSelector: '.isotope-item', layoutMode: 'masonry' });
    });

    $('.filters_listing').on('click', 'input', 'change', function () {
        var selector = $(this).attr('data-filter');
        $('.isotope-wrapper').isotope({ filter: selector });
    });

    $("#range").ionRangeSlider({
        hide_min_max: true,
        keyboard: true,
        min: 30,
        max: 180,
        from: 60,
        to: 130,
        type: 'double',
        step: 1,
        prefix: "Min. ",
        grid: false
    });

});