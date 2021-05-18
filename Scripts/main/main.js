
(function ($, window, appConfigs) {
    $(document).ready(function () {
        var fnAffterAll = undefined;
        var srvNotifyDeliveried = new Services("base/system-msg-deliveried", {}, function (ret) {

            if (fnAffterAll != undefined) fnAffterAll(ret);
        
        }, 'no-api');
		var srvNotifyDeliveriedYes = function(ret){
			if (ret === "True"){
						$(".notify").animate({
							opacity: 0.25,
							top: "-200px"
						}, 5000, function() {
							 $(".notify").remove();
						});
						fnAffterAll = undefined;
					}
		};

        if (appConfigs.NotifyDeliveried === "True") {
            setTimeout(function () {
                fnAffterAll = srvNotifyDeliveriedYes;
                srvNotifyDeliveried.post({ markread: true });
            }, 7000);

        } else {
			
            fnAffterAll = function(ret) {
                if (ret !== "") {
					$("#notify-template").html("<mark class='notify'><p>[Please don't close browers]</p>Getting new notification......</mark>");
					setTimeout(function () {
                        $("#notify-template").html(ret).hide();
                        setTimeout(function () {
                            $("#notify-template").show();
                        }, 3000);
						   setTimeout(function () {
							   fnAffterAll = srvNotifyDeliveriedYes;
								srvNotifyDeliveried.post({ markread: true });
							}, 7000);
                    }, 1000);
                }
            }
            srvNotifyDeliveried.get();
        }
        // Use this to initialize your chart
    });
})(jQuery, window, AppConfigs);

$(function () {
    "use strict";
    
    var hrefs = decodeURIComponent(window.location.pathname);
    var active = function (el, applied, hrefa) {
        console.log(hrefa);
        if (hrefa === "" || hrefa === "vi" || hrefa === "en" || hrefa === "ja") {
            $($(el).find("li")[0]).addClass("active");
        }
        else {
            $.each($(el).find("a"), function (k, v) {
                if ($(v).attr("href").replace("/", "") === hrefa || ($(v).attr("data-href") != undefined && $(v).attr("data-href").replace("/", "") === hrefa)) {
                    if (applied === "parent")
                         $(v).parent().addClass("active");
                    else $(v).addClass("active");
                }
            });
        }
    };
    active(".main-menu", "parent", hrefs.replace("/", ""));

    // Post Activity:
    var actionType = "View::" + window.location.pathname;
    if (window.sessionStorage.getItem("firstAccess") == null) {
        actionType = "Visits";
        window.sessionStorage.setItem("firstAccess", true);  
    }
    new Services("base/post-activity", {}, function () { }, 'no-api').post({ actionType: actionType });

    // now your currtime looks like 530 if it's 5.30am, or 1730 if it's 5.30 pm
    // you can just do a simple comparison between ints
    var d = new Date();
    var h = d.getHours();
    var currtime = h * 100 + d.getMinutes();

    if (currtime > 1900 || currtime < 700) {
        // closed between 20:00 (8 pm) and 8:00 (8 am) as an example
        $("body").addClass("we-are-closed"); 
    }

}(jQuery));

document.addEventListener('DOMContentLoaded', function () {
    var noscriptContainer = document.getElementById("async-stylesheets");
    if (noscriptContainer != null) {
        var container = document.createElement("div");
        container.innerHTML = noscriptContainer.textContent;
        document.body.appendChild(container);
    }
}, false);

$(document).ready(function () {

    $(".time-ago").timeago();
});
