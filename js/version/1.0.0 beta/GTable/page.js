//                    _ooOoo_
//                   o8888888o
//                   88" . "88
//                   (| -_- |)
//                   O\  =  /O
//                ____/`---'\____
//              .'  \\|     |//  `.
//             /  \\|||  :  |||//  \
//            /  _||||| -:- |||||-  \
//            |   | \\\  -  /// |   |
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

define(function () {
    return {
        render: function (opts) {
            function Gpage (opt) {
                this.$con      = $("#"+opt.page.pageId);
                this.curPage   = parseInt(opt.page.curPage, 10);
                this.totalNums = parseInt(opt.page.totalNums, 10);
                this.showLen   = parseInt(opt.page.showLen, 10) || 10;
                this.callback  = opt.loadPageComplete || function(){};
            }

            Gpage.prototype = {

                constructor: Gpage,

                init: function () {
                    if (!this.totalNums || this.totalNums === 0) {
                        return;
                    }
                    this.$con.empty();
                    this.addPrevItem();
                    this.addNextItem();
                    this.addToPage();
                },

                addPrevItem: function () {
                    if (this.curPage == 1) {
                        return;
                    }
                    var _this = this;
                    var $item = $('<span class="pageItem prev-page">上一页</span>');
                    $item.on("click", function () {
                        _this.callback( --_this.curPage );
                    });
                    _this.$con.append($item);
                },

                addNextItem: function () {
                    if (this.curPage == this.totalNums) {
                        return;
                    }
                    var _this = this;
                    var $item = $('<span class="pageItem next-page">下一页</span>');
                    $item.on("click", function () {
                        _this.callback( ++_this.curPage );
                    });
                    _this.$con.append($item);
                },

                addToPage: function () {
                    var _this = this, val;
                    var $toPage = $('<select class="toPage"></select>');
                    for (var i=1; i<=_this.totalNums; i++) {
                        if (i != _this.curPage) {
                            $toPage.append('<option value="'+i+'">'+i+'</option>');
                        } else {
                            $toPage.append('<option value="'+i+'" selected="selected">'+i+'</option>');
                        }
                    }

                    $toPage.on("change", function (e) {
                        _this.callback( $(this).children("option:selected").val() );
                    });

                    _this.$con.append($toPage);
                }

            };
            var page = new Gpage(opts);
            page.init();
        },
        doInit: function (opts) {
            this.render(opts);
        }
    };
});
            


