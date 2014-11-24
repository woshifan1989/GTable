/**
 * @name GTable.js
 * @desc 
 * @dependencies jquery
 * @author fanhaiwang
 * @example
 */

define(function (require) {
    
    var $window = $(window),
        $body   = $("body");

    require("./hScroll");

    return {
        render: function (opts) {
            
            var draw = require("./draw");
            draw.doInit(opts);

            if (opts.page && opts.page.isPage === true) {
                var page = require("./page");
                page.doInit(opts);
            };
                
            if (opts.fixedHead && opts.fixedHead.isFixedHead === true ) {
                var fixedHead = require("./fixedHead");
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
        refresh: function (opts) {
            this.remove(opts);
            this.render(opts);
        },
        remove: function (opts) {
            $("#"+opts.containElement).empty();
        },
        addRows: function (opts) {

            var operation = require("./operation");
            operation.addRows(opts);
            $("#"+opts.containElement).resizeHScroll({
                "idName": opts.containElement+"_Scroll"
            });

        }
    };
});
