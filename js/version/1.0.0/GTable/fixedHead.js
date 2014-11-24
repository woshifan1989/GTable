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
 * @name fixeHead
 * @desc 列头时刻保持在表格上方
 * @dependencies jquery|GTable
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
    $.GTable.fixedHead = {
        render: function (opts) {

            var i,
                l,
                $window = $(window),
                $body   = $("body");

            var options = opts;

            var $GTable = $("#"+options.containElement);

            function initFixedHead () {
                // 获取滚动条高度
                var scrollTop = $window.scrollTop();
                var originalOffset = $GTable.offset();
                if (scrollTop > originalOffset.top 
                    && scrollTop < originalOffset.top + $GTable.outerHeight() - $GTable.find(".GTable-head").outerHeight()) {
                    
                    if ($GTable.find(".fixedHead").size() > 0) {
                        return;
                    }

                    // 固定列头
                    var $fixedHead = $('<div class="fixedHead"></div>');
                    $fixedHead.css({
                        "position": "fixed",
                        "top": 0,
                        "width": Math.min($GTable.find(".GTableWrap").outerWidth(), $GTable.outerWidth()),
                        "overflow": "hidden"
                    });

                    var $headClone = $GTable.find(".GTable-head").clone(true);
                    $fixedHead.append($headClone);
                    var $fixedCenterCols = $headClone.find(".GTable-head-centerCols");
                    $fixedCenterCols.css({
                        "margin-left": $GTable.find(".GTable-body-tr .GTable-body-centerCols-table").eq(0).offset().left 
                                    - $GTable.offset().left 
                                    - ($GTable.find(".GTable-body-tr .GTable-body-leftCols-table").eq(0).outerWidth() || 0)
                    });
                    $GTable.append($fixedHead);

                    // callback
                    if (options.fixedHead.fixedHeadComplete && $.isFunction(options.fixedHead.fixedHeadComplete)) {
                        options.fixedHead.fixedHeadComplete();
                    };
                    
                } else {
                    if ($GTable.find(".fixedHead")) {
                        $GTable.find(".fixedHead").remove();
                    };
                }
            }

            initFixedHead();
                
            $window.on("scroll", function (e) {
                initFixedHead();
            });

            $window.on("scrollFixedHead.gTable", function () {
                
                if ($GTable.find(".fixedHead").size() > 0) {
                    $GTable.find(".fixedHead .GTable-head-centerCols").css({
                        "margin-left": $GTable.find(".GTable-body-tr .GTable-body-centerCols-table").eq(0).offset().left
                                     - $GTable.offset().left
                                     - ($GTable.find(".GTable-body-tr .GTable-body-leftCols-table").eq(0).outerWidth() || 0)
                    });
                };

            });
            $GTable.children(".GTableWrap").on("scroll", function () {
                $window.trigger("scrollFixedHead.gTable");
            });

            $window.on("resizeFixedHead.gTable", function () {
                
                $GTable.find(".fixedHead").remove();
                
                function compare (argument) {
                    setTimeout(function () {

                        initFixedHead();
                        if ($GTable.find('.fixedHead').size() > 0) {
                            if ($GTable.outerWidth() != $GTable.find(".fixedHead").outerWidth()) {
                                compare();
                            };
                        }; 
                        
                    }, 100);
                }
                compare();

            });
            $window.on("resize", function () {
                $window.trigger("resizeFixedHead.gTable");
            });

        },
        doInit: function (opts) {
            this.render(opts);
        }
    };
});
