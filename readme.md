#GTable
A powerful table components

##What can it do
   
   * support lock left columns or right columns or both
   * table fold line
   * set column width and alignment ... by yourself
   * fixed column head
   * fixed scroll to bottom
   * add rows
   * paging
   * data repository 'tableOptions'

##API

1. doInit: creat GTable
2. refresh: refresh GTable
3. remove: remove GTable
4. addRows: add rows

##How to use

First of all ,let us look at a most important options that is used by 'gtable.doInit'.
    
```javascript
{
    containElement: "GTable",   //id名称
    data: [],
    colModel: {
        "leftCols": [
            {columnName:"cbx", fieldName:"cbx", width: 50, align: "center", isShow: true, areaElement:"checkbox", 
                //function返回boolean
                cbx: function (opt) {
                    if (opt.freezeAble === "Y") {
                        // return true;
                        return '<input type="checkbox" />';
                    } else {
                        // return false;
                        return '<input type="checkbox" disabled="disabled"/>';
                    }
                }
            }
        ],
        "rightCols": [
            {columnName:"操作", fieldName:"act", width: 150, align: "center", isShow: true, 
                act: function (opt) {
                    var str = [];
                    if (opt.freezeAble === "Y") {
                        // 可以冻结   checkbox是亮的
                        str.push('<a title="冻结" class="freeze" tid="'+opt.billId+'">冻结</a>');
                    } else {
                        str.push('<button title="取消冻结" type="button" class="btn btn-default ml10 unfreeze" tid="'+opt.billId+'"> <span class="icon unfreezeIcon"></span>取消冻结</button>');
                    }
                    return str.join("");
                }
            }
        ],
        "centerCols": [
            {columnName:"关联交易对账单", fieldName:"billNumber", width: 200, align: "left", isShow: true, areaElement:"select"},
            {columnName:"发起方公司", fieldName:"relGroupFromDesc", width: 150, align: "left", isShow: true, areaElement:"textarea"},
            {columnName:"接收方公司", fieldName:"relGroupToDesc", width: 150, align: "left", isShow: true, areaElement:"input"},
            {columnName:"创建人10", fieldName:"creationPerson", width: 100, align: "center", isShow: true, areaElement:"input"},
            {columnName:"创建人11" fieldName:"creationPerson", width: 100, align: "center", isShow: true, areaElement:"input"},
            {columnName:"当前处理人", fieldName:"currentPerson", width: 200, align: "center", isShow: true, areaElement:"input"}
        ]
    },
    loadTableComplete: function () {
        // console.log("loadTableComplete");
    },
    page: {
        isPage: true,
        pageId: "page",
        curPage: 5,
        totalNums: 30,
        loadPageComplete: function (num) {}
    },
    fixedHead: {
        isFixedHead: true,
        fixedHeadComplete: function () {}
    },
    addRowComplete: function () {}
}
```

Before the function, you must assign array for options.data

'tableOptoins' is a data repository, it can manager you data, so you can redraw your table by it easily.

##skills
It provides a number of js files, but just 'draw.js' and 'hScroll' are must, so the best choice is you only choose what you want.

##Rely
**jQuery**、**requireJs**

##Compatibility
**IE7+**、**ff**、**chrome**

