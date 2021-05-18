﻿
(function($) {
    $.hunterPopup = function(box, options) {
        var box = $(box);
        var defaults = {
            title: 'jQuery hunterPopup Demo',
            placement: 'left',
            width: '100%',
            height: '100%',
            content: $('<div><h3>jQuery hunterPopup Demo</h3></div>'),
            event: closePopup,
            rendered: options.renderedFn,
        };
        var obj = $.extend(defaults, options);

        var template = $('<div class="Hunter-pop-up" id="Hunter-pop-up"><a class="close"><i class="glyphicon glyphicon-remove"></i></a><div class="arrow"></div><h3 class="title"></h3><div id="Hunter_pop_wrap" class="Hunter-wrap"></div></div>');
        var title = $('.title', template);
        var pop_wrap = $('#Hunter_pop_wrap', template);

        $(document).click(function() {
            template.remove();
        });

        box.click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            $('.Hunter-pop-up').remove();
            var _this = $(this);
            var offset = _this.offset();
            var top = offset.top + _this.outerHeight() + 15;
            if(obj.placement == 'left') {
                template.css({
                    'left': offset.left,
                    'top': top
                });
            } else {
                template.addClass("Hunter-pop-up-right");
                template.css({
                    'left': offset.left - obj.width + _this.width() / 2,
                    'top': top
                });
            }

            buildPopup();
            $('body').append(template);
            $('.Hunter-pop-up').click(function(event) {
                event.stopPropagation();
            });

            //调用弹出层内容注册的事件。
            obj.event();
            obj.rendered();

        });

        function buildPopup() {
            buildPopupContent();
            closePopup();
        };

        function buildPopupContent() {
            title.text(obj.title);

            //构造弹出层的内容
            var _content = obj.content;
            _content.show();
            pop_wrap.children().remove();
            pop_wrap.append(_content);
            pop_wrap.width(obj.width);
            pop_wrap.height(obj.height);
        };

        function closePopup() {
            template.on('click', '.close', function(event) {
                event.preventDefault();
                event.stopPropagation();
                template.remove();
            });
        }
    };

    $.fn.extend({
        hunterPopup: function(options) {
            options = $.extend({}, options);
            this.each(function() {
                new $.hunterPopup(this, options);
            });
            return this;
        }

    });
})(jQuery);