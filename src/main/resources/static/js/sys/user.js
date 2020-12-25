/**
 * Created by Administrator on 2019/9/2.
 */

//入口
$(function () {
    $("#app").css("height", $(window).height());
    // $('#app').layout({});
    // ztree();
    $('.datetimepicker').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        autoclose: true //选择后自动关闭
    });
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

            $.each(data.data.merchants, function (i, e) {
                var $option = $("<option>", {
                    text: e.merchantName
                })
                $option.appendTo($("#umerchantName"));
            })
        }
    });

    $.ajax({
        type: "get",
        url: "/kq/shift/list",
        dataType: "JSON",
        async: false,
        success: function (data) {
            $.each(data.data.shifts, function (i, e) {
                var $option = $("<option>", {
                    text: e.shiftName
                })
                $option.appendTo($("#shiftName"));
            })

            $.each(data.data.shifts, function (i, e) {
                var $option = $("<option>", {
                    text: e.shiftName
                })
                $option.appendTo($("#ushiftName"));
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
                        align: 'center',
                        sortable: true
                    },{
                        field: 'name',
                        title: '员工姓名',
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'merchantName',
                        title: '供应商名称',
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'shiftName',
                        title: '班次',
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'startTime',
                        title: '开始时间',
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'endTime',
                        title: '结束时间',
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'workHour',
                        title: '工时',
                        align: 'center',
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

//置空
function rezero() {
    $("#uid").val("");
    $("#uname").val("");
    $("#umerchantName").val("请选择");
    $("#ushiftName").val("请选择");
    $("#usdate").val("");
    $("#uedate").val("");
}

//编辑/新增--模态框
var childs = [];

function insert() {
    $(".modal").modal("toggle");
    $("#id").val("");
    $("#name").val("");
    $("#merchantName").val("请选择");
    $("#shiftName").val("请选择");
    $("#sdate").val("");
    $("#edate").val("");
}

$('#btn_cancel').click(function () {
    $(".modal").modal("hide");
})

$('#btn_confirm').click(function () {
    $('[name="published"]').val(false);
    $('#blog-form').submit();

    //校验
    if($("#name").val() == ""){
        toastr.error("请填写员工名称");
    }

    if("请选择" == $("#merchantName").val()){
        toastr.error("请选择供应商名称");
    }

    if("请选择" == $("#shiftName").val()){
        toastr.error("请选择班次");
    }
    if($("#sdate").val() == ""){
        toastr.error("请填写开始时间");
    }
    if($("#edate").val() == ""){
        toastr.error("请填写结束时间");
    }
    var id = $("#id").val();
    var name = $("#name").val();
    var merchantName = $("#merchantName").val();
    var shiftName = $("#shiftName").val();
    var startTime = $("#sdate").val();
    var endTime = $("#edate").val();
    if (new Date(startTime).getTime() > new Date(endTime).getTime()) {
        toastr.error("开始时间必须小于结束时间");
        return;
    }
    var mss = (new Date(endTime).getTime()-new Date(startTime).getTime())/3600000;
    console.info(mss.toFixed(2));
    var workHour = mss.toFixed(2);

    $.ajax({
        url: "/kq/employee/insertEmployee",
        type: "post",
        dataType: "json",
        data: {
            "id":id,
            "name": name,
            "merchantName": merchantName,
            "shiftName": shiftName,
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
                $("#shiftName").val("");
                $("#sdate").val("");
                $("#edate").val("");
                //刷新页面
                toastr.info(res.message);
                setTimeout("window.location.reload()",1000);
            } else {
                toastr.info(res.message);
            }

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
                 toastr.info(data.message);
                 setTimeout("window.location.reload()",1000);
            } else {
                toastr.info(data.message);
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
                $("#shiftName").val(e.shiftName);
                $("#sdate").val(e.startTime);
                $("#edate").val(e.endTime);
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
    var id = $("#uid").val().trim();
    var name = $("#uname").val().trim();
    var shiftName = $("#ushiftName").val();
    var merchantName = $("#umerchantName").val();
    var startTime = $("#usdate").val();
    var endTime = $("#uedate").val();
    /* var sdate = new Date(startTime).getTime();
     var edate = new Date(endTime).getTime();*/
    if (new Date(startTime).getTime() > new Date(endTime).getTime()) {
        toastr.error("开始时间必须小于结束时间");
    }
    $.ajax({
        url: "/kq/employee/selectList",
        type: "get",
        dataType: "json",
        data: {
            "id": id,
            "name": name,
            "merchantName": merchantName,
            "shiftName": shiftName,
            "startTime": startTime,
            "endTime": endTime
        },
        success: function (data) {
            var options = {
                data: data.employees,
                id: "id",
                modalName: "员工",
                columns: [
                    {
                        field: 'id',
                        title: '编号',
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'name',
                        title: '员工姓名',
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'merchantName',
                        title: '供应商名称',
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'shiftName',
                        title: '班次',
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'startTime',
                        title: '开始时间',
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'endTime',
                        title: '结束时间',
                        align: 'center',
                        sortable: true
                    }, {
                        field: 'workHour',
                        title: '工时',
                        align: 'center',
                        sortable: true
                    }, {
                        title: '操作',
                        align: 'center',
                        formatter: formatterOpt
                    }
                ]
            }
            $.mytable.initTable(options);
            $("#reportTable").bootstrapTable("load", data.data.employees);
        }
    })

}



