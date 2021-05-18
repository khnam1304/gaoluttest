/**
 * Created by tuanpa on 7/26/16.
 */
$(document).ready(function () {
    $(".copy-right").bind("copy", function () {
        copyrightText();
    });
});


function copyrightText() {
    var bodyElement = document.getElementsByTagName("body")[0];
    var selection = window.getSelection();
    var selectionHtml = getSelectionHtml();
    selectionHtml = handleRegex(selectionHtml);
    var newDiv = document.createElement('div');
    // newDiv.style.position = 'absolute';
    // newDiv.style.left = '-99999px';
    bodyElement.appendChild(newDiv);
    newDiv.innerHTML = selectionHtml;
    selection.selectAllChildren(newDiv);
    window.setTimeout(function () {
        bodyElement.removeChild(newDiv);
    }, 0);
};

function handleRegex(selectionHtml) {
    var productTitle, regexClear, regexTitle, regexImg, productUrl;
    productTitle = $('#product-title').val();
    regexClear = new RegExp(/<a\s(.+?)>(.+?)<\/a>/, 'img');
    regexTitle = new RegExp(productTitle, 'img');
    regexImg = new RegExp(/<\s*img.*?src="(.*?)".*?>/, 'img');
    productUrl = window.location.href;
    selectionHtml = selectionHtml.replace(/&nbsp;/g, ' ');
    selectionHtml = selectionHtml.replace(/&amp;/g, '&');
    selectionHtml = selectionHtml.replace(regexClear, '$2');
    selectionHtml = selectionHtml.replace(new RegExp(/\schiaki.vn/, 'img'), ' <a href="http://chiaki.vn">chiaki.vn</a>');
    selectionHtml = selectionHtml.replace(new RegExp(/\schiaki/, 'img'), ' <a href="http://chiaki.vn">chiaki</a>');

    selectionHtml = selectionHtml.replace(regexTitle, '<a href="' + productUrl + '" >' + productTitle + '</a>');
    selectionHtml = selectionHtml.replace(regexImg, '<a href="' + productUrl + '"><img src="$1" alt="' + productTitle + '" /></a>');
    return selectionHtml;
}

function getSelectionHtml() {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
}

/*!
 * accounting.js v0.4.2, copyright 2014 Open Exchange Rates, MIT license, http://openexchangerates.github.io/accounting.js
 */
(function (p, z) { function q(a) { return !!("" === a || a && a.charCodeAt && a.substr) } function m(a) { return u ? u(a) : "[object Array]" === v.call(a) } function r(a) { return "[object Object]" === v.call(a) } function s(a, b) { var d, a = a || {}, b = b || {}; for (d in b) b.hasOwnProperty(d) && null == a[d] && (a[d] = b[d]); return a } function j(a, b, d) { var c = [], e, h; if (!a) return c; if (w && a.map === w) return a.map(b, d); for (e = 0, h = a.length; e < h; e++) c[e] = b.call(d, a[e], e, a); return c } function n(a, b) { a = Math.round(Math.abs(a)); return isNaN(a) ? b : a } function x(a) { var b = c.settings.currency.format; "function" === typeof a && (a = a()); return q(a) && a.match("%v") ? { pos: a, neg: a.replace("-", "").replace("%v", "-%v"), zero: a } : !a || !a.pos || !a.pos.match("%v") ? !q(b) ? b : c.settings.currency.format = { pos: b, neg: b.replace("%v", "-%v"), zero: b } : a } var c = { version: "0.4.1", settings: { currency: { symbol: "$", format: "%s%v", decimal: ".", thousand: ",", precision: 2, grouping: 3 }, number: { precision: 0, grouping: 3, thousand: ",", decimal: "." } } }, w = Array.prototype.map, u = Array.isArray, v = Object.prototype.toString, o = c.unformat = c.parse = function (a, b) { if (m(a)) return j(a, function (a) { return o(a, b) }); a = a || 0; if ("number" === typeof a) return a; var b = b || ".", c = RegExp("[^0-9-" + b + "]", ["g"]), c = parseFloat(("" + a).replace(/\((.*)\)/, "-$1").replace(c, "").replace(b, ".")); return !isNaN(c) ? c : 0 }, y = c.toFixed = function (a, b) { var b = n(b, c.settings.number.precision), d = Math.pow(10, b); return (Math.round(c.unformat(a) * d) / d).toFixed(b) }, t = c.formatNumber = c.format = function (a, b, d, i) { if (m(a)) return j(a, function (a) { return t(a, b, d, i) }); var a = o(a), e = s(r(b) ? b : { precision: b, thousand: d, decimal: i }, c.settings.number), h = n(e.precision), f = 0 > a ? "-" : "", g = parseInt(y(Math.abs(a || 0), h), 10) + "", l = 3 < g.length ? g.length % 3 : 0; return f + (l ? g.substr(0, l) + e.thousand : "") + g.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + e.thousand) + (h ? e.decimal + y(Math.abs(a), h).split(".")[1] : "") }, A = c.formatMoney = function (a, b, d, i, e, h) { if (m(a)) return j(a, function (a) { return A(a, b, d, i, e, h) }); var a = o(a), f = s(r(b) ? b : { symbol: b, precision: d, thousand: i, decimal: e, format: h }, c.settings.currency), g = x(f.format); return (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal)) }; c.formatColumn = function (a, b, d, i, e, h) { if (!a) return []; var f = s(r(b) ? b : { symbol: b, precision: d, thousand: i, decimal: e, format: h }, c.settings.currency), g = x(f.format), l = g.pos.indexOf("%s") < g.pos.indexOf("%v") ? !0 : !1, k = 0, a = j(a, function (a) { if (m(a)) return c.formatColumn(a, f); a = o(a); a = (0 < a ? g.pos : 0 > a ? g.neg : g.zero).replace("%s", f.symbol).replace("%v", t(Math.abs(a), n(f.precision), f.thousand, f.decimal)); if (a.length > k) k = a.length; return a }); return j(a, function (a) { return q(a) && a.length < k ? l ? a.replace(f.symbol, f.symbol + Array(k - a.length + 1).join(" ")) : Array(k - a.length + 1).join(" ") + a : a }) }; if ("undefined" !== typeof exports) { if ("undefined" !== typeof module && module.exports) exports = module.exports = c; exports.accounting = c } else "function" === typeof define && define.amd ? define([], function () { return c }) : (c.noConflict = function (a) { return function () { p.accounting = a; c.noConflict = z; return c } }(p.accounting), p.accounting = c) })(this);
Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
};

HvHelpers = {};

HvHelpers.loading = {
    skipShow: true, // default not loading
    show: function (force) {
        if (force)
            HvHelpers.loading.skipShow = false;

        if (!HvHelpers.loading.skipShow && $("html").size() === 1) {
            if (HvHelpers.loadingInstance == undefined) {
                HvHelpers.loadingInstance = $("html");
                this.showHandle();
            }
            else {

                this.showHandle();
            }
        }

    },
    hide: function(force, delay) {
            if (force === 'after') {
                setTimeout(function() {
                    HvHelpers.loadingInstance.removeClass("loading");
                }, delay);
            } else {
                if (force)
                    HvHelpers.loading.forceHide = false;
            if (HvHelpers.loadingInstance && !HvHelpers.loading.forceHide) {
                HvHelpers.loadingInstance.removeClass("loading");
            }
        }

    },
    showHandle: function () {

        HvHelpers.loadingInstance.addClass("loading");
    }
};

HvHelpers.alert = function (msg, action, fn) {
    alert(msg);
    if (fn) fn();
};

HvHelpers.assignUrl = function (url) {

    HvHelpers.loading.show('force'); window.location.assign(url);
};
HvHelpers.getUrlParams = function (url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i=0; i<arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            var paramValue = typeof(a[1])==='undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                    // if array index number specified...
                else {
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
                // if param name doesn't exist yet, set it
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;
}
HvHelpers.timeServer = function () {

    try {
        return new Date($("#realdate").html().trim().split('/').reverse().join("-") + ' ' + $("#realtime").html());
    } catch (ex) {
        return new Date();
    }
};

HvHelpers.AdjustDateTime = function (dateInput) {

    var date = new Date(dateInput);
    if (date == "Invalid Date") {
        var adjust = (dateInput.indexOf("CH") === -1) ? 0 : 12;
        var from = dateInput.split(" ");
        if (from.length === 1) from = dateInput.split("T");
        var numbers = from[0].match(/\d+/g);
        if (numbers != null) {
            if (numbers.length === 1) numbers = from[0].split("-");

            var time = from[1].replace("SA", "").replace("CH", "").split(":");
            if (numbers[2].toString().length === 4) {
                return new Date(numbers[2], numbers[1] - 1, numbers[0], time[0], time[1], time[2]).addHours(adjust);
            }
            else
                return new Date(numbers[0], numbers[1] - 1, numbers[2], time[0], time[1], time[2]).addHours(adjust);
        }

        return new Date();

    } else {
        return date;
    }

};

HvHelpers.getAgoDate = function (dateStr, format) {

    if (!dateStr) { return ""; }
    var date = HvHelpers.AdjustDateTime(dateStr);

    var relativeTo = HvHelpers.timeServer(); //defines relative to what ..default is now
    var delta = parseInt((relativeTo.getTime() - date.getTime()) / 1000);
    delta = (delta < 0) ? 1 : delta;
    var r = '';

    if (delta === 1) {
        r = Resources._("Just now!");
    }
    else if (delta < 10) {
        r = delta + ' ' + Resources._("seconds ago");

    } else if (delta < 120) {
        r = "1 " + Resources._("minutes") + ' ' + (delta - 60) + ' ' + Resources._("seconds") + ' ' + Resources._("ago");
    } else if (delta < (45 * 60)) {
        r = (parseInt(delta / 60, 10)).toString() + ' ' + Resources._("minutes") + ' ' + Resources._("ago");
    } else {
        var m;
        if (delta < (2 * 60 * 60)) {
            m = (Math.floor(delta / 60) - 60);
            r = '1 ' + Resources._('hours') + ' ' + (m < 0 ? '' : m + "'") + ' ' + Resources._('ago');
        } else if (delta < (24 * 60 * 60)) {
            var h = (parseInt(delta / 3600, 10));
            m = Math.floor((delta / 60) - (h * 60));
            r = '' + h + ' ' + Resources._('hours') + ' ' + (m < 0 ? '' : m + "'") + ' ' + Resources._('ago');
        } else { return HvHelpers.getFormatDate(dateStr, (format)); }
    }
    return ' ' + r;

};

HvHelpers.getFormatDate = function (dateInput, format) {

    var date = HvHelpers.AdjustDateTime(dateInput);
    var addZero = function (val) {

        if (val < 10) return "0" + val;
        else return val;
    };

    var dayMapping = Resources.Resource["dayMapping"];
    var hours = addZero(date.getUTCHours());
    var minutes = addZero(date.getUTCMinutes());
    var seconds = addZero(date.getUTCSeconds());
    var reft = AppConfigs.DateTimeFormatting === "dd/MM/yyyy" ? (addZero(date.getUTCDate()) + '/' + addZero(date.getUTCMonth() + 1) + '/' + addZero(date.getUTCFullYear())) : (addZero(date.getUTCMonth() + 1) + '/' + addZero(date.getUTCDate()) + '/' + addZero(date.getUTCFullYear()));
    if (format === 'full') return dayMapping[date.getUTCDay()] + ', ' + (reft) + ' - ' + hours + ':' + minutes + ':' + seconds + ' ' + Resources._("zone");
    if (format === 'date') return reft;
    else return (reft) + ' - ' + hours + ':' + minutes + ':' + seconds;
};


HvHelpers.getLocation = function (fn) {

    var callFn = function () {
        clearTimeout(limitedWait);
        if (fn) fn(window.Profiles);
    };
    var limitedWait = setTimeout(function () {
        if (fn) fn({ Ip: "undefined", Region: "undefined" });
    }, 5000);

    if (typeof (Profiles) == "undefined") {
        $.get("http://ipinfo.io", function (response) {
            window.Profiles = { Ip: response.ip, Region: response.region };
            callFn(window.Profiles);
        }, "jsonp");
    } else {
        callFn();
    }
};


HvHelpers.parseMoney = function (amount, callback) {

    if (AppConfigs.CurrencyRate === "1") {
        callback(HvHelpers.formatNumber(amount));
    }
    else {
        if (!isNaN(amount)) {
            $.getJSON(AppConfigs.HOST + "/api/Utils/GetFormatCurrency?value=" + amount, function (data) {
                callback(data);
            });
        }
    }
};

HvHelpers.formatNumber = function (v, n, x, s, c) {
    if (typeof v == "string") v = parseFloat(v);
    if (AppConfigs.CurrencyFormatting === "$ {0:#,##0}") return accounting.formatMoney(v, {
        symbol: "$",
        precision: 0,
        thousand: ".",
        format: {
            pos: "%s %v",
            neg: "%s (%v)",
            zero: "%s 0"
        }
    });
    else if (AppConfigs.CurrencyFormatting === "{0:#,##0} ₫") return accounting.formatMoney(v, {
        symbol: "₫",
        precision: 0,
        thousand: ".",
        format: {
            pos: "%v %s",
            neg: "%s (%v)",
            zero: "0 %s"
        }
    });
    else if (AppConfigs.CurrencyFormatting === "¥ {0:#,##0}") return accounting.formatMoney(v, {
        symbol: "¥  ",
        precision: 0,
        thousand: ".",
        format: {
            pos: "%s %v",
            neg: "%s (%v)",
            zero: "0 %s"
        }
    });

    return accounting.formatMoney(v, {
        symbol: "# ",
        precision: 0,
        thousand: ".",
        format: {
            pos: "%v %s",
            neg: "%s (%v)",
            zero: "0 %s"
        }
    });
    //return accounting.formatMoney(v);
};

Number.prototype.formatMoney = function (n, x, s, c) {

    return HvHelpers.formatNumber(this, n, x, s, c);
};

HvHelpers.modifyUrlParameter = function (param, val, url) {
   
    url = url == undefined ? window.location.href : url;
    if (val == null || val == "") return url;
    var theAnchor = null;
    var newAdditionalUrl = "";
    var tempArray = url.split("?");
    var baseUrl = tempArray[0];
    var additionalUrl = tempArray[1];
    var temp = "";
    var tmpAnchor;
    var theParams;
    if (additionalUrl) {
        tmpAnchor = additionalUrl.split("#");
        theParams = tmpAnchor[0];
        theAnchor = tmpAnchor[1];
        if (theAnchor)
            additionalUrl = theParams;

        tempArray = additionalUrl.split("&");

        for (i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
                newAdditionalUrl += temp + tempArray[i];
                temp = "&";
            }
        }
    }
    else {
        tmpAnchor = baseUrl.split("#");
        theParams = tmpAnchor[0];
        theAnchor = tmpAnchor[1];

        if (theParams)
            baseUrl = theParams;
    }

    if (theAnchor)
        val += "#" + theAnchor;

    var rowsTxt = temp + "" + param + "=" + val;
    return baseUrl + "?" + newAdditionalUrl + rowsTxt;
};


HvHelpers.loadJsQueued = [];
HvHelpers.loadJs = function (url, obj, isready, asyn) {

    var scripts = document.getElementsByTagName('script');
    var len = scripts.length;
    for (var i = 0; i < len; i++) {
        if (scripts[i].src.search(url) > 0 && scripts[i].src.lastIndexOf("/") >= 0) {
            HvHelpers.loadJsQueued.push(url);
            break;
        }
    }
    if (HvHelpers.loadJsQueued.indexOf(url) == -1) {
        HvHelpers.loadJsQueued.push(url);
        var script = document.createElement('script');
        script.src = AppConfigs.HOST + "/" + url;
        var head = document.getElementsByTagName('head')[0], done = false;
        head.appendChild(script);
        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true; console.log(url, ":: load when not ready!");
                if (isready) isready();
                script.onload = script.onreadystatechange = null;
                //head.removeChild(script);
            }
        };
    }
    else {
        //console.log(url,"::is ready, no load!");
        if (isready && asyn == undefined) isready();
    }
};

HvHelpers.Jsonify = (function (div) {
    return function (json) {
        if (json == "") return {};
        div.setAttribute('onclick', 'this.__json__ = ' + json);
        div.click();
        return div.__json__;
    };
})(document.createElement('div'));

$.fn.scrollTo = function (target, options, callback) {
    if (typeof options == 'function' && arguments.length == 2) { callback = options; options = target; }
    var settings = $.extend({
        scrollTarget: target,
        offsetTop: 10,
        duration: 500,
        easing: 'swing'
    }, options);
    return this.each(function () {
        var scrollPane = $(this);
        var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
        var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
        scrollPane.animate({ scrollTop: scrollY }, parseInt(settings.duration), settings.easing, function () {
            if (typeof callback == 'function') { callback.call(this); }
        });
    });
};

HvHelpers.scrollTo = function (target, margin) {

    $('html, body').animate({ scrollTop: ($(target).offset().top - (margin)) }, 100);
};


Number.prototype.format = function (n, x, s, c) {

    return HvHelpers.formatNumber(this, n, x, s, c);
};

Number.prototype.round = function (places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
};

HVGetFiles = { cssLoaded: {}, scriptLoaded: {}, waiting: {} };
HVGetFiles.Script = function (urlJs, callbacks) {
    if (urlJs) urlJs = AppConfigs.HOST + urlJs + "?7200";
    if (!HVGetFiles.scriptLoaded[urlJs]) {
        HVGetFiles.waiting[urlJs] = true;
        HVGetFiles.scriptLoaded[urlJs] = "__loaded__";
        jQuery.ajax({
            url: urlJs,
            type: 'GET',
            dataType: "script",
            cache: true,
            success: function () {
                delete HVGetFiles.waiting[urlJs];
                if (callbacks) callbacks();
            },
            error: function (response) {
                console.error("Ajax js Error: ", response);
            }
        });
    } else {
        if (callbacks) {
            if (HVGetFiles.waiting[urlJs] == true) {
                setTimeout(function () { callbacks(); }, 3200);
            } else callbacks();
        }
    }
};

HVGetFiles.Scripts = function (arrayLink) {

    for (var i in arrayLink) {
        if (arrayLink.hasOwnProperty(i)) {
            HVGetFiles.Script("/" + arrayLink[i]);
        }
    }
};

HVGetFiles.CSS = function (urlCss, callbacks) {
    if (urlCss) urlCss = AppConfigs.HOST + urlCss + "?7200";
    if (!HVGetFiles.cssLoaded[urlCss]) {
        var stylesheet = document.createElement('link');
        stylesheet.href = urlCss;
        stylesheet.rel = 'stylesheet';
        stylesheet.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
        HVGetFiles.cssLoaded[urlCss] = "__loaded__";
        if (callbacks) callbacks();

    } else {
        if (callbacks) callbacks();
    }
};

HVGetFiles.CSSs = function (arrayLink) {
    for (var i in arrayLink) {
        if (arrayLink.hasOwnProperty(i)) {
            HVGetFiles.CSS("/" + arrayLink[i]);
        }
    }
};

HVGetFiles.Htm = function (urlHtm, callbacks) {
    if (urlHtm) urlHtm = AppConfigs.HOST + urlHtm;
    $.get(urlHtm, callbacks);
};
