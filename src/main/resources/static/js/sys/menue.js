/**
 * Created by Administrator on 2019/9/2.
 */
//入口
$(function() {

        myinit()

    });

//初始化
function myinit() {
    var data=[];
    $.ajax({
        url:"../../data/sys/menu.json",
        dataType:"JSON",
        async:false,
        success:function (data1) {
            data=data1;
            var options = {
                data:data,
                idField: 'menuId',
                columns: [
                    { field: 'check',  checkbox: true},
                    { field: 'menuName',  title: '菜单名称' },
                    {field: 'orderNum', title: '排序', sortable: true, align: 'center'},
                    {field: 'url', title: '请求地址', align: "center", sortable: true},
                    {field: 'menuType', title: '类型', align: "center", formatter:formatterType},
                    {field:'visible',title: '可见', align: "center", formatter:formatterStatus},
                    {field: 'perms', title: '权限标识', align: "center", sortable: true},
                    {title: '操作', align: 'center', formatter: formatterOpt}
                ],

                // bootstrap-table-treegrid.js 插件配置 -- start

                //在哪一列展开树形
                treeShowField: 'menuName',
                //指定父id列
                parentIdField: 'parentId',

                onResetView: function(data) {
                    //console.log('load');
                    $('#reportTable').treegrid({
                        /*initialState: 'collapsed',// 所有节点都折叠*/
                        initialState: 'expanded',// 所有节点都展开，默认展开
                        treeColumn: 1,
                        // expanderExpandedClass: 'glyphicon glyphicon-minus',  //图标样式
                        // expanderCollapsedClass: 'glyphicon glyphicon-plus',
                        onChange: function() {
                            $('#reportTable').bootstrapTable('resetWidth');
                        }
                    });

                    //只展开树形的第一级节点
                    /* $('#reportTable').treegrid('getRootNodes').treegrid('expand');*/

                }
            };
            $.mytreetable.initTtable(options);
        },
        error:function () {

        }
    })


}

//类型formatter
function formatterType(value, row, index) {
    if (value == 'M') {
        return '<span class="badge badge-info">目录</span>';
    } else if (value == 'C') {
        return '<span class="badge badge-success">菜单</span>';
    }
}

//可见formatter
function formatterStatus(value, row, index) {
    if (value == '10') {
        return '<span class="badge badge-info">显示</span>';
    } else if (value == '20') {
        return '<span class="badge badge-success">隐藏</span>';
    }
}

//操作formatter
function formatterOpt(value, row, index) {
    /* console.info(row)*/
    var actions = [];
    /*getVue();*/
    actions.push("<a name='bianji' class='btn btn-success btn-xs' onclick='update(this)'><i class='fa fa-edit'></i>编辑</a> ");
    actions.push('<a class="btn btn-danger btn-xs btnRemove" href="javascript:void(0);"  ><i class="fa fa-remove"></i>删除</a> ');
    actions.push('<a class="btn btn-info btn-xs btnRefresh" href="javascript:void(0);" ><i class="fa fa-key"></i>重置</a>');
    return actions.join('');
}


//搜索
var dts=[];
function searchs() {

    $.getJSON("../../data/sys/menu.json",function (data){

        var cname = $("#cname").val().trim();
        var cstatus = $("#cstatus").val().trim();
        dts=[];
        g=[];
        arr=[];
        c = [];
        $.each(data, function (i, e) {
            if ((e.menuName).includes(cname) && (e.visible).includes(cstatus)) {
                dts.push(e)
            }
        })
        oldfather(data, dts);
        /*console.info(arr)*/
        allchilds(data,arr);
        for(var i=0;i<arr.length;i++){  //将父节点放入子节点中，整合
            g.push(arr[i])
        }
        /* for(var j=0;j<g.length;j++){
         all.push(g[j])
         }*/
        console.info(g)
        $("#reportTable").bootstrapTable("load",g);
    })

}


//递归查询所有子节点
var g=[];
function allchilds(x,arr) {
    var h = [];
    $.each(x, function (i, e) {
        $.each(arr, function (k, n) {
            if (n.menuId == e.parentId) {
                g.push(e);
                h.push(e);
                /*console.info(e);*/
            }

        });

    });
    if(h.length!=0){
        allchilds(x,h)
    }
}


//查询该元素的最上级父节点
var c = [];
var arr = [];
function oldfather(x, dts) {
    var f = [];
    $.each(x, function (i, e) {
        $.each(dts, function (j, m) {
            if (e.menuId == m.parentId) {
                f.push(e)
            }
            if (m.parentId == 0) {
                c.push(m)
            }
        })

    });
    if (f.length!=0) {
        oldfather(x, f)
    }else{
        arr = Array.from(new Set(c))
    }

}

//编辑
var childs = [];
function update(x) {
    $(".modal").modal("toggle")
    childs = x.parentNode.parentNode.childNodes;
    /*console.info(childs)*/
    var menueName = $(childs[3]).text();
    console.info(menueName)


    $.getJSON("../../data/sys/menu.json",function (data){
        $.each(data,function (i,e) {
            if((e.menuName+"")==menueName){
                $("#menueName").val(e.menuName);
                $("#menueSort").val(e.orderNum);
                $("#address").val(e.url);
                $("#style").val(e.menuType);
                $("#see").val(e.visible);
                $("#bs").val(e.perms);
            }
        })
    })


}

//类型下拉框赋值
var s = ["C","M"];
for(var i=0;i<s.length;i++) {
    var $option = $("<option>", {
        text: s[i]
    })
    $option.appendTo($("#style"));
}

//可见下拉框赋值
var s = ["0","10","20"];
for(var i=0;i<s.length;i++) {
    var $option = $("<option>", {
        text: s[i]
    })
    $option.appendTo($("#see"));
}

//置空
function rezero() {
    $("#cname").val("");
    $("#cstatus").val("");

}