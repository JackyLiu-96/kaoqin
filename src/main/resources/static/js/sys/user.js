/**
 * Created by Administrator on 2019/9/2.
 */

//入口
$(function () {
        $("#app").css("height",$(window).height());
        $('#app').layout({});
        ztree();
        btable();
    });

function ztree() {
    $.ajax({
        url:"../../data/sys/dept.json",
        dataType:"JSON",
        success:function (data) {
            init(data);
        },
        error:function () {

        }
    })
}
//table初始化
function btable() {
    $.ajax({
        url:"../../data/sys/user.json",
        dataType:"JSON",
        success:function (ds) {
            var options ={
                data: ds,
                method: 'get',
                sortName: "userId",
                sortOrder: "desc",
                id: "userId",
                modalName: "用户",
                pagination: true,            //是否显示分页
                sidePagination: "client",       //分页方式：client
                pageNumber: 1,
                pageSize: 3,
                pageList: [1, 2, 3, 4],
                showColumns: true,
                striped: true, // 是否显示行间隔色
                showHeader: true, // 显示头部，默认显示
                showExport: true, // 显示导出
                showFullscreen: true, // 显示全屏
                showRefresh: true, // 是否显示刷新按钮
                sortable: true, // 是否启用排序


                strictSearch: true,
                minimumCountColumns: 2, // 最少允许的列数
                clickToSelect: true, // 是否启用点击选中行
                showToggle: true, // 是否显示详细视图和列表视图的切换按钮
                cardView: false, // 是否显示详细视图
                detailView: false, // 是否显示父子表
                columns: [
                    {
                        checkbox: true
                    }, {
                        field: 'userId',
                        title: '用户ID',
                        align: "center",
                        sortable: true

                    }, {
                        field: 'loginName',
                        title: '登录名称',
                        sortable: true
                    }, {
                        field: 'userName',
                        title: '用户名称',
                        sortable: true
                    }, {
                        field: 'dept.deptName',
                        title: '部门',
                        sortable: true
                    }, {
                        field: 'email',
                        title: '邮箱',
                        sortable: true
                    }, {
                        field: 'phonenumber',
                        title: '手机',
                        sortable: true
                    }, {
                        field: 'status',
                        title: '状态',
                        formatter: formatterStatus
                    }, {
                        title: '操作',
                        align: 'center',
                        formatter: formatterOpt
                    }
                ]
            };
            $.mytable.initTable(options);

        },
        error:function () {

        }
    })
}
//z-tree初始化
function init(data) {

    var setting={
            view: {
                selectedMulti: false
            },
            /*开启简单数据结构*/
            data:{
                simpleData:{
                    enable:true,
                        idKey:"deptId",
                        pIdKey:"parentId"
                },
                key:{
                    name:"deptName"
                }
            },
            callback: {
                onClick: zTreeOnClick
            }



   }
    $.fn.zTree.init($("#tree"), setting, data);

}
//状态格式化
function formatterStatus(value, row, index) {
    if (value == '01') {
        return '<span class="badge badge-primary">正常</span>';
    } else if (value == '02') {
        return '<span class="badge badge-danger">停用</span>';
    }
}
//状态格式化
function formatterOpt(value, row, index) {
    /* console.info(row)*/
    var actions = [];
    /*getVue();*/
    actions.push("<a name='xinzeng' class='btn btn-danger btn-xs' onclick='insert()'><i class='fa fa-plus'></i>新增</a> ");
    actions.push("<a name='bianji' class='btn btn-success btn-xs' onclick='update(this)'><i class='fa fa-edit'></i>编辑</a> ");
    actions.push('<a class="btn btn-danger btn-xs btnRemove" href="javascript:void(0);"  ><i class="fa fa-remove"></i>删除</a> ');
    actions.push('<a class="btn btn-info btn-xs btnRefresh" href="javascript:void(0);" ><i class="fa fa-key"></i>重置</a>');
    return actions.join('');
}

//z-tree nodes 点击事件
function zTreeOnClick(event, treeId, treeNode) {

    $.getJSON("../../data/sys/user.json",function (data) {

        var arr = data.filter(function (a) {
            return treeNode.deptId==a.deptId;
        });
        /*console.info(arr)*/
        $("#reportTable").bootstrapTable("load",arr)
    })
};

//编辑/新增--模态框
var childs = [];
function insert() {
    $(".modal").modal("toggle")
}

    $('#btn_confrim').click(function () {
        $('[name="published"]').val(false);
        $('#blog-form').submit();

    var name = $("#name").val();
    var merchantName = $("#merchantName").val();
    var shift = $("#shift").val();
    var startTime = $("#sdate").val();
    var endTime = $("#edate").val();
    var workHour = $("#workHour").val();

    $.ajax({
        url: "/kq/user/insertEmployee",
        type: "post",
        dataType: "json",
        data: {
            "name": name,
            "merchantName": merchantName,
            "shift": shift,
            "startTime": startTime,
            "endTime": endTime,
            "workHour": workHour
        },
        success: function (res) {
            if (res.code == 2000) {
                //关闭对话框
                $(".modal").modal("hide");
                //清空文本框
                $("#name").val("");
                $("#merchant").val("");
                $("#shift").val("");
                $("#startTime").val("");
                $("#endTime").val("");
                $("#workhour").val("");

                //刷新页面
                window.location.href = "user.html";
            }
            alert(res.message);
        }
    });



    $.ajax({
        type: "get",
        url: "../../data/sys/dept.json",
        dataType: "JSON",
        async: false,
        success:function (data) {
            $.each(data,function (i,e) {
                var $option = $("<option>",{
                    text:e.deptName
                })
                $option.appendTo($("#dept"));
            })
        }
    });

});

function update(x) {
    $(".modal").modal("toggle")
    childs = x.parentNode.parentNode.childNodes;
    /*console.info(childs)*/
    var uIdText = $(childs[3]).text();
    /* console.info(uIdText)*/


    $.getJSON("../../data/sys/user.json",function (data){
        $.each(data,function (i,e) {
            if((e.userId+"")==uIdText){
                $("#uId").val(e.userId);
                $("#lname").val(e.loginName);
                $("#un").val(e.userName);
                $("#dept").val(e.dept.deptName);
                $("#email").val(e.email);
                $("#phone").val(e.phonenumber);
                $("#sta").val(e.status);
            }
        })
    })

    $.ajax({
        type: "get",
        url: "../../data/sys/dept.json",
        dataType: "JSON",
        async: false,
        success:function (data) {
            $.each(data,function (i,e) {
                var $option = $("<option>",{
                    text:e.deptName
                })
                $option.appendTo($("#dept"));
            })
        }
    });

}

//下拉框赋值
var s = ["0","01","02"];
for(var i=0;i<s.length;i++){
    var $option = $("<option>",{
        text:s[i]
    })
    $option.appendTo($("#sta"));
}

//搜索
function search1() {
    var d=[];
    $.getJSON("../../data/sys/user.json",function (data){

        var uname = $("#uname").val().trim();
        var uphone= $("#uphone").val().trim();
        var status = $("#status").val();
        var startTime = $("#cdate").val();
        var endTime = $("#cdate1").val();
        /* var sdate = new Date(startTime).getTime();
         var edate = new Date(endTime).getTime();*/
        if(new Date(startTime).getTime()>new Date(endTime).getTime()){
            toastr.error("开始时间必须小于结束时间");
        }

        //搜索具体实现
        $.each(data,function (i,e) {
            if((e.loginName).includes(uname)&&(e.phonenumber).includes(uphone)&&(e.status).includes(status)&&(startTime=="")&&(endTime=="")){
                d.push(e);
            }else if((e.loginName).includes(uname)&&(e.phonenumber).includes(uphone)&&(e.status).includes(status)&&(new Date(startTime).getTime()!="")&&(endTime=="")){
                if(new Date(startTime).getTime()<new Date(e.createTime).getTime()){
                    d.push(e);
                }
            }else if((e.loginName).includes(uname)&&(e.phonenumber).includes(uphone)&&(e.status).includes(status)&&(startTime=="")&&(new Date(endTime).getTime()!=="")){
                if(new Date(endTime).getTime()>new Date(e.createTime).getTime()){
                    d.push(e);
                }
            }else if((e.loginName).includes(uname)&&(e.phonenumber).includes(uphone)&&(e.status).includes(status)&&(new Date(startTime).getTime()!="")&&(new Date(endTime).getTime()!="")){
                if(new Date(startTime).getTime()<new Date(e.createTime).getTime()&&new Date(endTime).getTime()>new Date(e.createTime).getTime()){
                    d.push(e);
                }
            }

        })

        $("#reportTable").bootstrapTable("load",d);
    })

}

//置空
function rezero() {
    $("#uname").val("");

    $("#uphone").val("");

    $("#status").val("");
    $("#cdate").val("");
    $("#cdate1").val("");
}

