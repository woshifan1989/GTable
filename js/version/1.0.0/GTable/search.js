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
 * @name search
 * @desc 搜索
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

    $.GTable.search = {
        render: function (opts) {

            var options    = opts, 
                leftCols   = options.colModel.leftCols,
                rightCols  = options.colModel.rightCols,
                centerCols = options.colModel.centerCols;

            var hasLeftCols   = !!(leftCols && leftCols.length>0),
                hasRightCols  = !!(rightCols && rightCols.length>0),
                hasCenterCols = !!(centerCols && centerCols.length>0);

            var $GTable = $("#"+options.containElement);

            function addSearchRow () {
                
                var str = [];

                str.push('<div class="GTable-body-tr">');

                if (hasLeftCols) {
                    str.push('<div class="GTable-body-leftCols">' +
                                    '<table width="100%" cellpadding="0" cellspacing="0" class="GTable-body-leftCols-table">' +
                                        '<tr>');

                    for (i=0, l=leftCols.length; i<l; i++) {

                        switch(leftCols[i].areaElement){
                            case "input":
                            case "select":
                            case "textarea":
                                str.push('<td style="width:'+ leftCols[i].width +'px;text-align:'+ (leftCols[i].align||"left") +';'+ (leftCols[i].isShow? "": "display:none;") +'"><input type="text" class="elc_ipt ipt_search ipt_search_'+ leftCols[i].fieldName +'"></td>');
                                break;

                            case "checkbox":
                            default:
                                str.push('<td style="width:'+ leftCols[i].width +'px;text-align:'+ (leftCols[i].align||"left") +';'+ (leftCols[i].isShow? "": "display:none;") +'"></td>');

                        }
                        
                    }
                    
                    str.push(             '</tr>' +
                                    '</table>' +
                                '</div>'); 
                };

                if (hasRightCols) {
                    str.push('<div class="GTable-body-rightCols">' +
                                    '<table width="100%" cellpadding="0" cellspacing="0" class="GTable-body-rightCols-table">' +
                                        '<tr>');
                                        
                    for (i=0, l=rightCols.length; i<l; i++) {

                        switch(rightCols[i].areaElement){
                            case "input":
                            case "select":
                            case "textarea":
                                str.push('<td style="width:'+ rightCols[i].width +'px;text-align:'+ (rightCols[i].align||"left") +';'+ (rightCols[i].isShow? "": "display:none;") +'"><input type="text" class="elc_ipt ipt_search ipt_search_'+ rightCols[i].fieldName +'"></td>');
                                break;

                            case "checkbox":
                            default:
                                str.push('<td style="width:'+ rightCols[i].width +'px;text-align:'+ (rightCols[i].align||"left") +';'+ (rightCols[i].isShow? "": "display:none;") +'"></td>');

                        }

                    }
                    
                    str.push(             '</tr>' +
                                    '</table>' +
                                '</div>'); 
                };

                if (hasCenterCols) {
                    str.push('<div class="GTable-body-centerCols">' +
                                    '<table width="100%" cellpadding="0" cellspacing="0" class="GTable-body-centerCols-table">' +
                                        '<tr>');
                                        
                    for (i=0, l=centerCols.length; i<l; i++) {
                        switch(centerCols[i].areaElement){
                            case "input":
                            case "select":
                            case "textarea":
                                str.push('<td style="width:'+ centerCols[i].width +'px;text-align:'+ (centerCols[i].align||"left") +';'+ (centerCols[i].isShow? "": "display:none;") +'"><input type="text" class="elc_ipt ipt_search ipt_search_'+ centerCols[i].fieldName +'"></td>');
                                break;

                            case "checkbox":
                            default:
                                str.push('<td style="width:'+ centerCols[i].width +'px;text-align:'+ (centerCols[i].align||"left") +';'+ (centerCols[i].isShow? "": "display:none;") +'"></td>');

                        }

                    }
                    
                    str.push(             '</tr>' +
                                    '</table>' +
                                '</div>');
                }
  
                str.push('</div>');
                
                return str;
            }

            var $newRow = $(addSearchRow().join(""));
            // 操作css
            var w_leftCols  = 0,
                w_rightCols = 0,
                w_centerCols      = 0;
            if (leftCols && leftCols.length>0) {
                for (i=0, l=leftCols.length; i<l; i++){
                    if (leftCols[i].isShow) {
                        w_leftCols += +leftCols[i].width;
                    };
                }
                $newRow.find(".GTable-body-leftCols").css({
                    width: w_leftCols + "px"
                });
            };
            if (rightCols && rightCols.length>0) {
                for (i=0, l=rightCols.length; i<l; i++){
                    if (rightCols[i].isShow) {
                        w_rightCols += +rightCols[i].width;
                    }
                }
                $newRow.find(".GTable-body-rightCols").css({
                    width: w_rightCols + "px"
                });
            };
            if (centerCols && centerCols.length>0) {
                for (i=0, l=centerCols.length; i<l; i++){
                    if (centerCols[i].isShow) {
                        w_centerCols += +centerCols[i].width;
                    }
                }
                if (w_centerCols+w_leftCols+w_rightCols > $GTable.outerWidth()) {
                    $newRow.find(".GTable-body-centerCols").css({
                        width: (w_centerCols+w_leftCols+w_rightCols) + "px"
                    });
                };
            };
            $newRow.find(".GTable-body-centerCols").css({
                "padding-left": w_leftCols + "px",
                "padding-right": w_rightCols + "px"
            });

            if (options.search.addSearchRowTo == "bottom") {
                $GTable.find(".GTable-body").append($newRow);
            } else {
                $GTable.find(".GTable-body").prepend($newRow);
            }
            
            var leftColsHeight = 0, rightColsHeight = 0, centerColsHeight = 0, equalHeight = 0;
            var leftTr  = $newRow.find(".GTable-body-leftCols-table tr"),
                rightTr = $newRow.find(".GTable-body-rightCols-table tr"),
                elseTr  = $newRow.find(".GTable-body-centerCols-table tr");
            if (hasLeftCols) {
                leftColsHeight = leftTr.outerHeight();
            };
            if (hasRightCols) {
                rightColsHeight = rightTr.outerHeight();
            };
            if (hasCenterCols) {
                centerColsHeight = elseTr.outerHeight();
            };
            equalHeight = Math.max(leftColsHeight, rightColsHeight, centerColsHeight);
            leftTr.css({
                height: equalHeight
            });
            rightTr.css({
                height: equalHeight
            });
            elseTr.css({
                height: equalHeight
            });

            if (opts.search.addSearchRowComplete && $.isFunction(opts.search.addSearchRowComplete)) {
                opts.search.addSearchRowComplete($newRow);
            };
            
            // 此处有坑，添加操作需要充值滚动条
            // elseTr.on("focus", ".elc_ipt, .elc_slt, .elc_txt", function () {
            //     var $this = $(this),
            //         _width = $this.width(),
            //         _thisOffset = $this.offset();

            //     var $lockLeft = leftTr,
            //         _lockLeftWidth = $lockLeft.width(),
            //         _lockLeftOffset = $lockLeft.offset();

            //     var $lockRight = rightTr,
            //         _lockLeftOffset = $lockLeft.offset();

            //     var $GTableWrap = $this.closest(".GTableWrap");
            //     var _marginLeft = $GTableWrap.css("margin-left").replace("-", "").replace("px", "");

            //     if (_thisOffset.left < (_lockLeftOffset.left + _lockLeftWidth)) {

            //         var skewing = _lockLeftOffset.left+_lockLeftWidth - _thisOffset.left;
            //         console.log(skewing);
            //         console.log(_marginLeft);
            //         $GTableWrap.css("margin-left", -1*(_marginLeft - skewing));
            //     };
            //     return false;
            // });
            


        },
        doInit: function (opts) {
            this.render(opts);
        }
    };

});
