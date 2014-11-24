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
 * @name tableOptions
 * @desc 管理表格数据仓库
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
    $.GTable.tableOptions = {
        options: {},
        setOptions: function (opts) {
            this.options[opts.key] = opts.val;
        },
        getOptions: function (key) {
            return this.options[key];
        },
        removeOptions: function (key) {
            console.log(this);
            if (typeof this.options[key] != "undefined") {
                delete this.options[key];
            };
        }
    };
});
