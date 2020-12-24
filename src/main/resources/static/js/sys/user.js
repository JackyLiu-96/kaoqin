/**
 * Created by Administrator on 2019/9/2.
 */

//入口
$(function () {
    $("#app").css("height", $(window).height());
    $('#app').layout({});
    // ztree();
    btable();

    $.ajax({
        type: "get",
        url: "/kq/merchant/list",
        dataType: "JSON",
        async: false,
        success: function (data) {
            $.each(data.data.merchants, function (i, e) {
                var $option = $("<option>", {
                    text: e.merchantName
                })
                $option.appendTo($("#merchantName"));
            })
        }
    });
});

// function ztree() {
//     $.ajax({
//         url: "../../data/sys/dept.json",
//         dataType: "JSON",
//         success: function (data) {
//             init(data);
//         },
//         error: function () {
//
//         }
//     })
// }

//table初始化
function btable() {
    $.ajax({
        url: "/kq/employee/list",
        dataType: "JSON",
        success: function (ds) {
            var options = {
                data: ds.data.employees,
                method: 'get',
                sortName: "id",
                sortOrder: "desc",
                id: "id",
                modalName: "员工",
                pagination: true,            //是否显示分页
                sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
                pageSize: 5,                       //每页的记录行数（*）
                pageList: [5, 10, 15, 20],        //可供选择的每页的行数（*）
                showColumns: true,
                striped: true, // 是否显示行间隔色
                showHeader: true, // 显示头部，默认显示
                showExport: true, // 显示导出
                showFullscreen: true, // 显示全屏
                showRefresh: true, // 是否显示刷新按钮
                sortable: true, // 是否启用排序
                smartDisplay:false,

                strictSearch: true,
                minimumCountColumns: 2, // 最少允许的列数
                clickToSelect: true, // 是否启用点击选中行
                showToggle: true, // 是否显示详细视图和列表视图的切换按钮
                cardView: false, // 是否显示详细视图
                detailView: false, // 是否显示父子表
                columns: [
                    {
                        field: 'id',
                        title: '编号',
                        sortable: true
                    },{
                        field: 'name',
                        title: '员工姓名',
                        sortable: true
                    }, {
                        field: 'merchantName',
                        title: '供应商名称',
                        sortable: true
                    }, {
                        field: 'shift',
                        title: '班次',
                        sortable: true
                    }, {
                        field: 'startTime',
                        title: '开始时间',
                        sortable: true
                    }, {
                        field: 'endTime',
                        title: '结束时间',
                        sortable: true
                    }, {
                        field: 'workHour',
                        title: '工时',
                        sortable: true
                    }, {
                        title: '操作',
                        align: 'center',
                        formatter: formatterOpt
                    }
                ]
            };
            $.mytable.initTable(options);

        },
        error: function () {

        }
    })
}

//z-tree初始化
// function init(data) {
//
//     var setting = {
//         view: {
//             selectedMulti: false
//         },
//         /*开启简单数据结构*/
//         data: {
//             simpleData: {
//                 enable: true,
//                 idKey: "deptId",
//                 pIdKey: "parentId"
//             },
//             key: {
//                 name: "deptName"
//             }
//         },
//         callback: {
//             onClick: zTreeOnClick
//         }
//
//
//     }
//     $.fn.zTree.init($("#tree"), setting, data);
//
// }

//状态格式化
// function formatterStatus(value, row, index) {
//     if (value == '01') {
//         return '<span class="badge badge-primary">正常</span>';
//     } else if (value == '02') {
//         return '<span class="badge badge-danger">停用</span>';
//     }
// }

//状态格式化
function formatterOpt(value, row, index) {
    /* console.info(row)*/
    var actions = [];
    /*getVue();*/
    actions.push("<a name='bianji' class='btn btn-success btn-xs' onclick='update(this)'><i class='fa fa-edit'></i>编辑</a> ");
    actions.push('<a class="btn btn-danger btn-xs btnRemove" href="javascript:void(0);" onclick="del(this)" ><i class="fa fa-remove"></i>删除</a> ');
    return actions.join('');
}

//z-tree nodes 点击事件
// function zTreeOnClick(event, treeId, treeNode) {
//
//     $.getJSON("../../data/sys/user.json", function (data) {
//
//         var arr = data.filter(function (a) {
//             return treeNode.deptId == a.deptId;
//         });
//         /*console.info(arr)*/
//         $("#reportTable").bootstrapTable("load", arr)
//     })
// };

//编辑/新增--模态框
var childs = [];

function insert() {
    $(".modal").modal("toggle")
    $("#id").val("");
    $("#name").val("");
    $("#merchantName").val("");
    $("#shift").val("");
    $("#startTime").val("");
    $("#endTime").val("");
    $("#workHour").val("");
}

$('#btn_cancel').click(function () {
    $(".modal").modal("hide");
})

$('#btn_confirm').click(function () {
    $('[name="published"]').val(false);
    $('#blog-form').submit();
    var id = $("#id").val();
    var name = $("#name").val();
    var merchantName = $("#merchantName").val();
    var shift = $("#shift").val();
    var startTime = $("#sdate").val();
    var endTime = $("#edate").val();
    var workHour = $("#workHour").val();

    $.ajax({
        url: "/kq/employee/insertEmployee",
        type: "post",
        dataType: "json",
        data: {
            "id":id,
            "name": name,
            "merchantName": merchantName,
            "shift": shift,
            "startTime": startTime,
            "endTime": endTime,
            "workHour": workHour
        },
        success: function (res) {
            console.info(res)
            if (res.code == 20000) {
                //关闭对话框
                $(".modal").modal("hide");
                //清空文本框
                $("#name").val("");
                $("#merchantName").val("");
                $("#shift").val("");
                $("#sdate").val("");
                $("#edate").val("");
                $("#workHour").val("");
                //刷新页面
                window.location.href = "user.html";
            }
            alert(res.message)
        }
    });


});

function del(obj) {

    childs = obj.parentNode.parentNode.childNodes;
    var uIdText = $(childs[1]).text();

    $.ajax({
        type: "post",
        url: "/kq/employee/delete/"+uIdText,
        dataType: "JSON",
        async: false,
        success: function (data) {
            if(data.code == 20000){
                alert(data.message)
                window.location.href = "user.html";
            }

        }
    });
}

function update(x) {
    $(".modal").modal("toggle")
    childs = x.parentNode.parentNode.childNodes;
    var uIdText = $(childs[1]).text();
    // console.info(uIdText)

    $.ajax({
        type: "get",
        url: "/kq/employee/"+uIdText,
        dataType: "JSON",
        async: false,
        success: function (data) {
            var e = data.data.employee;
            if (e.id == uIdText) {
                $("#id").val(e.id);
                $("#name").val(e.name);
                $("#merchantName").val(e.merchantName);
                $("#shift").val(e.shift);
                $("#sdate").val(e.startTime);
                $("#edate").val(e.endTime);
                $("#workHour").val(e.workHour);
            }

        }
    });


}

//下拉框赋值
// var s = ["0", "01", "02"];
// for (var i = 0; i < s.length; i++) {
//     var $option = $("<option>", {
//         text: s[i]
//     })
//     $option.appendTo($("#sta"));
// }

//搜索
function search1() {
    var d = [];
    $.getJSON("../../data/sys/user.json", function (data) {

        var uname = $("#uname").val().trim();
        var uphone = $("#uphone").val().trim();
        var status = $("#status").val();
        var startTime = $("#cdate").val();
        var endTime = $("#cdate1").val();
        /* var sdate = new Date(startTime).getTime();
         var edate = new Date(endTime).getTime();*/
        if (new Date(startTime).getTime() > new Date(endTime).getTime()) {
            toastr.error("开始时间必须小于结束时间");
        }

        //搜索具体实现
        $.each(data, function (i, e) {
            if ((e.loginName).includes(uname) && (e.phonenumber).includes(uphone) && (e.status).includes(status) && (startTime == "") && (endTime == "")) {
                d.push(e);
            } else if ((e.loginName).includes(uname) && (e.phonenumber).includes(uphone) && (e.status).includes(status) && (new Date(startTime).getTime() != "") && (endTime == "")) {
                if (new Date(startTime).getTime() < new Date(e.createTime).getTime()) {
                    d.push(e);
                }
            } else if ((e.loginName).includes(uname) && (e.phonenumber).includes(uphone) && (e.status).includes(status) && (startTime == "") && (new Date(endTime).getTime() !== "")) {
                if (new Date(endTime).getTime() > new Date(e.createTime).getTime()) {
                    d.push(e);
                }
            } else if ((e.loginName).includes(uname) && (e.phonenumber).includes(uphone) && (e.status).includes(status) && (new Date(startTime).getTime() != "") && (new Date(endTime).getTime() != "")) {
                if (new Date(startTime).getTime() < new Date(e.createTime).getTime() && new Date(endTime).getTime() > new Date(e.createTime).getTime()) {
                    d.push(e);
                }
            }

        })

        $("#reportTable").bootstrapTable("load", d);
    })

}

//置空
function rezero() {
    $("#id").val("");
    $("#name").val("");
    $("#merchantName").val("");
    $("#shift").val("");
    $("#sdate").val("");
    $("#edate").val("");
    $("#workHour").val("");
}

