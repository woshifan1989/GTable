/*
 *Draw table
 *param 
 */

define(function () {
    return {
        render: function (opts) {

            var i, 
                l,
                len,
                j, 
                s_table = [], 
                $window = $(window), 
                $body   = $("body");

            var options    = opts, 
                datas      = options.data,
                leftCols   = options.colModel.leftCols,
                rightCols  = options.colModel.rightCols,
                centerCols = options.colModel.centerCols;

            var hasLeftCols   = !!(leftCols && leftCols.length>0),
                hasRightCols  = !!(rightCols && rightCols.length>0),
                hasCenterCols = !!(centerCols && centerCols.length>0);

            var $GTable = $("#" + options.containElement);

            $GTable.empty();

            var $GTableWrap = $('<div class="GTableWrap hScroll_main"></div>');

            function getHeadStr () {
                
                var str = [];
                str.push('<div class="GTable-head"><div class="GTable-head-tr">');

                if (hasLeftCols) {
                    str.push('<div class="GTable-head-leftCols">' +
                                    '<table width="100%" cellpadding="0" cellspacing="0" class="GTable-head-leftCols-table">' +
                                        '<tr>');

                    for (i=0, l=leftCols.length; i<l; i++) {
                        
                        switch(leftCols[i]["fieldName"]){
                            case "cbx":
                                str.push('<th class="th_'+ leftCols[i]["fieldName"] +'" style="width:'+ leftCols[i].width +'px;text-align:'+ (leftCols[i].align||"left") + ';' + (leftCols[i].isShow? "": "display:none;") +'"><input type="checkbox" /></th>');
                                break;

                            default:
                                str.push('<th class="th_'+ leftCols[i]["fieldName"] +'" style="width:'+ leftCols[i].width +'px;text-align:'+ (leftCols[i].align||"left") + ';' + (leftCols[i].isShow? "": "display:none;") +'">'+ leftCols[i]["columnName"] +'</th>');

                        }
                        
                    }
                    
                    str.push(             '</tr>' +
                                    '</table>' +
                                '</div>');                    
                };

                if (hasRightCols) {
                    str.push('<div class="GTable-head-rightCols">' +
                                    '<table width="100%" cellpadding="0" cellspacing="0" class="GTable-head-rightCols-table">' +
                                        '<tr>');
                                        
                    for (i=0, l=rightCols.length; i<l; i++) {
                        
                        switch(rightCols[i]["fieldName"]){
                            case "cbx":
                                str.push('<th class="th_'+ rightCols[i]["fieldName"] +'" style="width:'+ rightCols[i].width +'px;text-align:'+ (rightCols[i].align||"left") +';'+ (rightCols[i].isShow? "": "display:none;") +'"><input type="checkbox" /></th>');
                                break;

                            default:
                                str.push('<th class="th_'+ rightCols[i]["fieldName"] +'" style="width:'+ rightCols[i].width +'px;text-align:'+ (rightCols[i].align||"left") +';'+ (rightCols[i].isShow? "": "display:none;") +'">'+ rightCols[i]["columnName"] +'</th>');

                        }
                    }
                    
                    str.push(             '</tr>' +
                                    '</table>' +
                                '</div>'); 
                };

                if (hasCenterCols) {
                    str.push('<div class="GTable-head-centerCols">' +
                                    '<table width="100%" cellpadding="0" cellspacing="0" class="GTable-head-centerCols-table">' +
                                        '<tr>');
                                        
                    for (i=0, l=centerCols.length; i<l; i++) {
                        
                        switch(centerCols[i]["fieldName"]){
                            case "cbx":
                                str.push('<th class="th_'+ centerCols[i]["fieldName"] +'" style="width:'+ centerCols[i].width +'px;text-align:'+ (centerCols[i].align||"left") +';'+ (centerCols[i].isShow? "": "display:none;") +'"><input type="checkbox" /></th>');
                                break;

                            default:
                                str.push('<th class="th_'+ centerCols[i]["fieldName"] +'" style="width:'+ centerCols[i].width +'px;text-align:'+ (centerCols[i].align||"left") +';'+ (centerCols[i].isShow? "": "display:none;") +'">'+ centerCols[i]["columnName"] +'</th>');

                        }
                    }
                    
                    str.push(             '</tr>' +
                                    '</table>' +
                                '</div>');
                }
   
                str.push('</div></div>');

                return str;

            }

            function getBodyStr () {
                
                var str = [];
                
                str.push('<div class="GTable-body">');

                if (typeof datas != "undefined" && datas.length != 0) {
                    
                    for (j=0, len=datas.length; j<len; j++) {
                        var _data = datas[j];
                        str.push('<div class="GTable-body-tr">');  

                        if (hasLeftCols) {
                            str.push('<div class="GTable-body-leftCols">' +
                                            '<table width="100%" cellpadding="0" cellspacing="0" class="GTable-body-leftCols-table">' +
                                                '<tr>');

                            for (i=0, l=leftCols.length; i<l; i++) {
                                // 操作需求
                                switch(leftCols[i]["fieldName"]){
                                    case "act":
                                        str.push('<td class="td_'+ leftCols[i]["fieldName"] +'" style="width:'+ leftCols[i].width +'px;text-align:'+ (leftCols[i].align||"left") +';'+ (leftCols[i].isShow? "": "display:none;") +'">'+ leftCols[i].act(_data) +'</td>');
                                        break;

                                    case "cbx":
                                        str.push('<td class="td_'+ leftCols[i]["fieldName"] +'" style="width:'+ leftCols[i].width +'px;text-align:'+ (leftCols[i].align||"left") +';'+ (leftCols[i].isShow? "": "display:none;") +'">'+ leftCols[i].cbx(_data) +'</td>');
                                        break;

                                    default:
                                        str.push('<td class="td_'+ leftCols[i]["fieldName"] +'" style="width:'+ leftCols[i].width +'px;text-align:'+ (leftCols[i].align||"left") +';'+ (leftCols[i].isShow? "": "display:none;") +'">'+ _data[ leftCols[i].fieldName ] +'</td>');

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
                                // 操作需求
                                switch(rightCols[i]["fieldName"]){
                                    case "act":
                                        str.push('<td class="td_'+ rightCols[i]["fieldName"] +'" style="width:'+ rightCols[i].width +'px;text-align:'+ (rightCols[i].align||"left") +';'+ (rightCols[i].isShow? "": "display:none;") +'">'+ rightCols[i].act(_data) +'</td>');
                                        break;

                                    case "cbx":
                                        str.push('<td class="td_'+ rightCols[i]["fieldName"] +'" style="width:'+ rightCols[i].width +'px;text-align:'+ (rightCols[i].align||"left") +';'+ (rightCols[i].isShow? "": "display:none;") +'">'+ rightCols[i].cbx(_data) +'</td>');
                                        break;

                                    default:
                                        str.push('<td class="td_'+ rightCols[i]["fieldName"] +'" style="width:'+ rightCols[i].width +'px;text-align:'+ (rightCols[i].align||"left") +';'+ (rightCols[i].isShow? "": "display:none;") +'">'+ _data[ rightCols[i].fieldName ] +'</td>');

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
                                // 操作需求
                                switch(centerCols[i]["fieldName"]){
                                    case "act":
                                        str.push('<td class="td_'+ centerCols[i]["fieldName"] +'" style="width:'+ centerCols[i].width +'px;text-align:'+ (centerCols[i].align||"left") +';'+ (centerCols[i].isShow? "": "display:none;") +'">'+ centerCols[i].act(_data) +'</td>');
                                        break;

                                    case "cbx":
                                        str.push('<td class="td_'+ centerCols[i]["fieldName"] +'" style="width:'+ centerCols[i].width +'px;text-align:'+ (centerCols[i].align||"left") +';'+ (centerCols[i].isShow? "": "display:none;") +'">'+ centerCols[i].cbx(_data) +'</td>');
                                        break;

                                    default:
                                        str.push('<td class="td_'+ centerCols[i]["fieldName"] +'" style="width:'+ centerCols[i].width +'px;text-align:'+ (centerCols[i].align||"left") +';'+ (centerCols[i].isShow? "": "display:none;") +'">'+ _data[ centerCols[i].fieldName ] +'</td>');

                                }
                            }
                            
                            str.push(             '</tr>' +
                                            '</table>' +
                                        '</div>');
                        }

                        str.push('</div>');
                    }
                };

                str.push('</div>');

                return str;
            }

            s_table = s_table.concat( getHeadStr(), getBodyStr() );
            $GTableWrap.append( s_table.join("") );
            
            // 操作css
            var w_leftCols   = 0,
                w_rightCols  = 0,
                w_centerCols = 0;
            if (leftCols && leftCols.length>0) {
                for (i=0, l=leftCols.length; i<l; i++){
                    if (leftCols[i].isShow) {
                        w_leftCols += +leftCols[i].width;
                    };
                }
                $GTableWrap.find(".GTable-head-leftCols, .GTable-body-leftCols").css({
                    width: w_leftCols + "px"
                });
            };
            if (rightCols && rightCols.length>0) {
                for (i=0, l=rightCols.length; i<l; i++){
                    if (rightCols[i].isShow) {
                        w_rightCols += +rightCols[i].width;
                    }
                }
                $GTableWrap.find(".GTable-head-rightCols, .GTable-body-rightCols").css({
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
                    $GTableWrap.find(".GTable-head-centerCols, .GTable-body-centerCols").css({
                        width: (w_centerCols+w_leftCols+w_rightCols) + "px"
                    });
                };
            };
            $GTableWrap.find(".GTable-head-centerCols, .GTable-body-centerCols").css({
                "padding-left": w_leftCols + "px",
                "padding-right": w_rightCols + "px"
            });

            $GTableWrap.css("width", w_centerCols+w_leftCols+w_rightCols);

            $GTable.append($GTableWrap); 

            $GTable.on("resetColsHeight.Gtable", function() {
                var $rows = $GTable.find(".GTable-body-tr"),
                    n_rowLength = $rows.size();

                for (i=0; i<n_rowLength; i++) {

                    var leftColsHeight   = 0, 
                        rightColsHeight  = 0, 
                        centerColsHeight = 0, 
                        equalHeight      = 0;

                    var $leftTr   = null,
                        $rightTr  = null,
                        $centerTr = null;

                    if (hasLeftCols) {
                        $leftTr  = $rows.eq(i).find(".GTable-body-leftCols-table tr");
                        leftColsHeight = $leftTr.outerHeight();
                    };
                    if (hasRightCols) {
                        $rightTr = $rows.eq(i).find(".GTable-body-rightCols-table tr");
                        rightColsHeight = $rightTr.outerHeight();
                    };
                    if (hasCenterCols) {
                        $centerTr  = $rows.eq(i).find(".GTable-body-centerCols-table tr");
                        centerColsHeight = $centerTr.outerHeight();
                    };
                    equalHeight = Math.max(leftColsHeight, rightColsHeight, centerColsHeight);
                    $leftTr && $leftTr.css({
                        height: equalHeight
                    });
                    $rightTr && $rightTr.css({
                        height: equalHeight
                    });
                    $centerTr && $centerTr.css({
                        height: equalHeight
                    });

                }
            });
            $GTable.trigger("resetColsHeight.Gtable");
            
            if (options.loadTableComplete && $.isFunction(options.loadTableComplete)) {
                options.loadTableComplete();
            };
        },
        remove: function (opts) {
            var $GTable = $(opts.containElement);
            $GTable.empty();
        },
        refresh: function (opts) {
            this.remove(opts);
            this.render(opts);
        },
        doInit: function (opts) {
            this.render(opts);
        }
    };
});
