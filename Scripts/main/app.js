HREF = window.location.hostname; // Assign href auto:
PORT = ':' + location.port;
Languages = {};
AppConfigs = {
    SECRET_KEY: '26C2E7C8-C689-D1D5-C452-58EC5A2F2A39',
    HOST: location.protocol + '//' + HREF + PORT
};

if (typeof Resources == "undefined") Resources = {Resource:{}};
Resources._ = function (val, params) {
    var ret = Resources.Resource[val] || val;
        ret = ret.replace("xxx", params);
    return ret;
};

Resources.Resource = {
        "hours": "giờ",
        "minutes": "phút",
        "seconds":"giây",
        "ago": "trước",
        "seconds ago": "Cách đây vài giây",
        "minutes ago": "Cách đây vài phút",
        "Just now!": "Vừa mới!",
        "dayMapping": { 1: 'Thứ hai', 2: 'Thứ ba', 3: 'Thứ tư', 4: 'Thứ năm', 5: 'Thứ sáu', 6: 'Thứ bẩy', 0: 'Chủ nhật' }
};



// StoreHours::
(function ($) {
    $.StoreHours = function () {
    };

    $.StoreHours.prototype = {
        getCurrentDay: function () {
            var weekday = new Array(7);
            weekday[0] = "sun";
            weekday[1] = "mon";
            weekday[2] = "tue";
            weekday[3] = "wed";
            weekday[4] = "thu";
            weekday[5] = "fri";
            weekday[6] = "sat";
            return weekday[new Date().getDay()];
        },
        getDateByHour: function (hour, gmt) {
            var d = new Date();
            var yyyy = d.getFullYear().toString();
            var mm = (d.getMonth() + 1).toString();
            var dd = d.getDate().toString();
            var dateStr = new Date().toString().substr(0, 16) + hour + ":00";
            if (gmt != null)
                dateStr += " GMT" + gmt;

            return new Date(dateStr);
        },
        storeHours: function (arguments) {
            $(".sh-" + this.getCurrentDay()).addClass("status-current");
            $(".sh-" + this.getCurrentDay() + " [data-sh-start]")
                .each(function () {
                    var gmt = $(this).attr('data-sh-gmt');
                    var dateStart = $.StoreHours.prototype.getDateByHour($(this).attr('data-sh-start'), gmt);
                    var dateEnd = $.StoreHours.prototype.getDateByHour($(this).attr('data-sh-end'), gmt);
                    var dt = new Date();

                    if (dt >= dateStart && dt <= dateEnd) {
                        $(this).parent().removeClass("status-closed");
                        $(this).parent().addClass("status-opened");
                    }
                    else {
                        if (!$(this).parent().hasClass("status-opened"))
                            $(this).parent().addClass("status-closed");
                    }

                });
            $(".sh-" + this.getCurrentDay())
                .each(function () {

                    var status = $("[data-sh-status]", this).attr("data-sh-status");
                    if (status !== "") {
                        $(this).addClass("status-" + status);
                    }
                });


            $(".sh-alert-opened").each(function () {
                if ($(".sh-" + $.StoreHours.prototype.getCurrentDay()).hasClass("status-opened"))
                    $(this).addClass("status-shown");
                else
                    $(this).addClass("status-hidden");
            });

            $(".sh-alert-closed").each(function () {
                if ($(".sh-" + $.StoreHours.prototype.getCurrentDay()).hasClass("status-closed"))
                    $(this).addClass("status-shown");
                else
                    $(this).addClass("status-hidden");
            });

        }
    };

    $.StoreHours.prototype.storeHours(arguments);

}(jQuery));

if ($('a.as-back-to-top').length > 0) {
    $(document).ready(function () {
        var w = window, d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth, // Viewport Width
            y = w.innerHeight || e.clientHeight || g.clientHeight; // Viewport Height

        if (x > 1024) {
            var toTopArrow = $('a.as-back-to-top');

            toTopArrow.on('click touchstart', function (e) {
                e.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, 800, 'swing');
                return false;
            });

            $(window).scroll(function () {
                console.log("$this.scrollTop()", $this.scrollTop());
                var $this = $(this);
                if ($this.scrollTop() > 600) {
                    toTopArrow.fadeIn();
                } else {
                    toTopArrow.fadeOut();
                }
            });

        }
    });
}
