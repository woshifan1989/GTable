//                    _ooOoo_
//                   o8888888o
//                   88" . "88
//                   (| -_- |)
//                   O\  =  /O
//                ____/`---'\____
//              .'  \|     |//  `.
//             /  \|||  :  |||//  \
//            /  _||||| -:- |||||-  \
//            |   | \\  -  /// |   |
//            | \_|  ''\---/''  |   |
//            \  .-\__  `-`  ___/-. /
//          ___`. .'  /--.--\  `. . __
//       ."" '<  `.___\_<|>_/___.'  >'"".
//      | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//      \  \ `-.   \_ __\ /__ _/   .-` /  /
// ======`-.____`-.___\_____/___.-`____.-'======
//                    '=---='
//            佛祖保佑       永无BUG
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

/**
 * @name hScroll
 * @desc 自定义横向滚动条
 * @dependencies jquery
 * @author fhw
 * @example
 */

(function($, factory){

    // Set up GTable for the environment. Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(function() {
            factory($);
        });

    // Finally, as a browser global.
    } else {
        factory($);
    }

})(jQuery, function($){

    $.fn.extend({
        loadHScroll: function(opt, distance){
            return this.each(function(){
                var defaults = {
                    "idName": "idScroll",
                    "css": {
                        "height": 7,
                        "background-color":"#000",
                        "position": "fixed",
                        "z-index": 999,
                        "opacity": 0.2,
                        "filter": "alpha(opacity=20)",
                        "border-radius": "2px",
                        "cursor": "move"
                    },
                    "lock": false, //默认false，不锁定滚动条
                    "toBottom": 0,
                    "moveFun": function () {},
                    "loadedFun": function () {}
                };
                var options = $.extend({}, defaults, opt);

                var $this           = $(this),
                    $child          = $this.children(".hScroll_main"),
                    $window         = $(window),
                    $body           = $("body"),
                    oThisOffset     = $this.offset(),
                    _thisOffsetTop  = oThisOffset.top,
                    _thisOffsetLeft = oThisOffset.left,
                    _thisWidth      = $this.width(),
                    _thisHeight     = $this.height(),
                    _childWidth     = $child.outerWidth(),
                    _bodyHeight     = $body.height();
                
                if (_thisWidth >= _childWidth) {
                    var _scrollWidth = 0;
                } else {
                    var _scrollWidth = _thisWidth / _childWidth * _thisWidth;
                }
                
                // 容器必须设置overflow=hidden
                $this.css({"overflow": "hidden"});

                // create dom
                var $scroll = null;
                if (typeof distance != "undefined") {
                    $child.css({"margin-left": -1 * distance});
                    $scroll = $("<div id='" + options.idName + "' class='smartHScroll'></div>")
                                .css($.extend(options.css, {
                                    "width": _scrollWidth, 
                                    "left": _thisOffsetLeft + (distance * _thisWidth / _childWidth) 
                                }));
                } else {
                    $child.css({"margin-left": 0});
                    $scroll = $("<div id='" + options.idName + "' class='smartHScroll'></div>")
                                .css($.extend(options.css, {
                                    "width": _scrollWidth, 
                                    "left": _thisOffsetLeft
                                }));
                }

                $this.append($scroll);
                
                $scroll.mousedown(function(ev){
                    fnDown(ev);
                    return false;
                }).mouseenter(function () {
                    $scroll.css({
                        "opacity": .6, 
                        "filter": "alpha(opacity=60)"
                    });
                }).mouseleave(function () {
                    $scroll.css({
                        "opacity": .2, 
                        "filter": "alpha(opacity=20)"
                    });
                });

                var disX = 0;
                function fnDown(ev){
                    var ev = ev || window.event;
                    disX = ev.clientX - $scroll.offset().left;
                    $(document).bind("mousemove", function(e){
                        fnMove(e);
                        options.moveFun();
                        $scroll.css({"opacity":.6, "filter": "alpha(opacity=60)"});
                        $body.css("cursor", "move");
                    });
                    $(document).bind("mouseup", function(e){
                        fnUp(e);
                        $scroll.css({"opacity": .2, "filter": "alpha(opacity=20)"});
                        $body.css("cursor", "default");
                    });
                }

                function fnMove (ev) {
                    var ev = ev || window.event;
                    goMove(ev);
                }
                function fnUp (ev) {
                    $(document).unbind("mousemove");
                    $(document).unbind("mouseup");
                }
                function goMove (ev) {
                    var d_value = ev.clientX - _thisOffsetLeft - disX;
                    var distance = _thisWidth - _scrollWidth;
                    d_value = d_value < 0? 0: (d_value>=distance? distance: d_value);
                    $scroll.css({left: d_value + _thisOffsetLeft});
                    $child.css({"margin-left": -d_value*_childWidth/_thisWidth});
                }

                var scrollTimer = null;
                $this.off("scroll.hScroll.gtable")
                    .on("scroll.hScroll.gtable", function(){

                    if (scrollTimer) {
                        clearTimeout(scrollTimer);
                    };
                    scrollTimer = setTimeout(function(){

                        var _thisOffsetTop = $this.offset().top;
                        var _thisHeight    = $this.height();
                        var _bodyHeight    = $body.height();

                        var toBottom     = _bodyHeight - _thisOffsetTop - _thisHeight;
                        var scrollTop    = $window.scrollTop(),
                            clientHeight = $window.height();

                        if (!options.lock){
                            if (scrollTop + clientHeight > _thisOffsetTop + _thisHeight
                                && scrollTop < _thisOffsetTop + _thisHeight) {
                                $scroll.css({
                                    "top": _thisOffsetTop + _thisHeight - scrollTop - options.css.height
                                });
                            } else {
                                $scroll.css({
                                    "top": -999
                                });
                            }
                            return;
                        };

                        if (scrollTop + clientHeight - _thisOffsetTop >= options.css.height) {
                            if (_bodyHeight - scrollTop - clientHeight < toBottom - options.toBottom) {
                                $scroll.css({
                                    "bottom": toBottom - (_bodyHeight - scrollTop - clientHeight)
                                });
                            } else {
                                $scroll.css({
                                    "bottom": options.toBottom + 2
                                });
                            }
                        } else {
                            $scroll.css({
                                "bottom": -999
                            });
                        }
                    }, 5);

                });
                $this.trigger("scroll.hScroll.gtable");

                var timer = null;
                $this.off("reset.hScroll.gtable")
                    .on("reset.hScroll.gtable", function (e) {
                    if (timer) {
                        clearTimeout(timer);
                    };
                    timer = setTimeout(function(){
                        $this.resetHScroll(options);
                    }, 100);
                });

                // callback
                options.loadedFun();
            });
        },

        removeHScroll: function (opt) {
            return this.each(function(){
                var $scroll = opt && opt.idName? $("#"+opt.idName): $(".smartHScroll");
                if ($scroll.size() > 0) {
                    $scroll.remove();
                };
            });
        }, 
        
        // distance margin-left距离
        resizeHScroll: function(opt) {
            // this.removeHScroll(opt);
            // this.loadHScroll(opt, distance);
            var $scroll = opt && opt.idName? $("#"+opt.idName): $(".smartHScroll");
            $scroll.trigger("scroll.hScroll.gtable");
        },

        resetHScroll: function(opt, distance) {
            this.removeHScroll(opt);
            this.loadHScroll(opt, distance);
        }

    });

});
