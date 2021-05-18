var Category = function () {

    var runInfiniteScroll = function () {
        var updateCount = function () {
            $(".result-count").addClass("item-update");
            $(".result-count #found-item").text("1-" + $(".list-product-wrapper .product-item").length);
            setTimeout(function () {
                $(".result-count").removeClass("item-update");

                //scrollFrame('.article a');
            }, 1200);

            $("#sortorder").bind("change", function () {

                $(this).closest('form').submit();
            });

            if (window.productAction != undefined) window.productAction();
            //$(".time-ago").timeago(); 
        }
        // init Infinite Scroll
        if ($(".PagedList-skipToNext a").length > 0) {
            $('.product-list-wrap').infiniteScroll({
                prefill: false,
                path: '.PagedList-skipToNext a',
                append: '.product-items',
                status: '.scroller-status',
                hideNav: '.paging',
                //checkLastPage: true,
                scrollThresold: 50,
                scrollThreshold: !($(".view-more-button").length > 0),
                button: '.view-more-button',
                responseType: 'document',
                
                history: 'push', historyTitle: true,
                debug: true,
                onInit: function() {
                    this.on('append', function () {
                        updateCount();
                    });
                }
            });
        } else {
            $(".load-more").hide();
        }
        updateCount();
    }
    return {
        init: function () {

            runInfiniteScroll();
        }
    };
}();

