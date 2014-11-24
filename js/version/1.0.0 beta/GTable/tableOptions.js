/*
 *tableOptoins.js
 *操作表格参数（增删改）
 */
define(function () {
    return {
        options: {},
        setOptions: function (opts) {
            this.options[opts.key] = opts.val;
        },
        getOptions: function (key) {
            return this.options[key];
        },
        removeOptions: function (key) {
            if (typeof this.options[key] != "undefined") {
                delete this.options[key];
            };
        }
    };
});





