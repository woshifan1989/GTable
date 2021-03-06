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
 * @name GTable.js
 * @desc 
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

    $.GTable = {
        render: function (opts) {
            
            var $window = $(window);
            
            var draw = $.GTable.draw;
            draw.doInit(opts);

            if (opts.page && opts.page.isPage === true) {
                var page = $.GTable.page;
                page.doInit(opts);
            };
                
            if (opts.fixedHead && opts.fixedHead.isFixedHead === true ) {
                var fixedHead = $.GTable.fixedHead;
                fixedHead.doInit(opts);
            };

            if (opts.search && opts.search.isSearch === true) {
                var search = require("./search");
                search.doInit(opts);
            };

            $("#"+opts.containElement).loadHScroll({
                "idName": opts.containElement+"_Scroll",
                "lock": (opts.hScroll && opts.hScroll.isLock == false) 
                        ? false
                        : true
                        ,
                "toBottom": (opts.hScroll && typeof opts.hScroll.toBottom == "number")
                            ? opts.hScroll.toBottom
                            : 0
                            ,
                "loadedFun": function () {
                    // console.log("加载完成");
                },
                "moveFun": function () {
                    $window.trigger("scrollFixedHead.gTable");
                }
            });

            $window.on("scroll", function() {
                $("#"+opts.containElement).trigger("scroll.hScroll.gtable");
            });

            $window.on("resize", function() {
                $("#"+opts.containElement).trigger("reset.hScroll.gtable");
            });
            
        },
        doInit: function (opts) {
            this.render(opts);
        },
        remove: function (opts) {
            $("#"+opts.containElement).empty();
        },
        refresh: function (opts) {
            this.remove(opts);
            this.render(opts);
        },
        addRows: function (opts) {

            var operation = $.GTable.operation;
            operation.addRows(opts);
            $("#"+opts.containElement).resizeHScroll({
                "idName": opts.containElement+"_Scroll"
            });

        }
    };

});
