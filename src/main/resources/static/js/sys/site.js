/**
 * Created by Administrator on 2019/9/2.
 */
//入口
$(function () {
        $("#app").css("height",$(window).height());
        // $('#app').layout({});
        btable();

    });

//table
function btable() {

    $.ajax({
        url:"/kq/site/list",
        dataType:"JSON",
        success:function (ds) {
            var options = {
                data: ds.data.sites,
                method: 'get',
                sortName: "id",
                sortOrder: "desc",
                id: "id",
                modalName: "场地",
                pagination: true,            //是否显示分页
                sidePagination: "client",       //分页方式：client
                pageNumber: 1,
                pageSize: 1,
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
                        field: 'id',
                        title: '场地编号',
                        align: "center",
                        sortable: true

                    }, {
                        field: 'siteName',
                        title: '场地名称',
                        align: "center",
                        sortable: true
                    }, {
                        field: 'siteStatus',
                        title: '状态',
                        align: "center",
                        formatter: formatterStatus
                    },{
                        title: '操作',
                        align: 'center',
                        formatter: formatterOpt
                    }
                ]

            }
            $.mytable.initTable(options);
        },
        error:function () {

        }
    })
}


//状态初始化
function formatterStatus(value, row, index) {
    if (value == '1') {
        return '<span class="badge badge-danger">启用</span>';
    } else if (value == '2') {
        return '<span class="badge badge-success">停用</span>';
    }
}

//状态格式化
function formatterOpt(value, row, index) {
    /* console.info(row)*/
    var actions = [];
    /*getVue();*/
    actions.push("<a name='bianji' class='btn btn-success btn-xs' onclick='update(this)'><i class='fa fa-edit'></i>编辑</a> ");
    actions.push('<a class="btn btn-danger btn-xs btnRemove" href="javascript:void(0);" onclick="del(this)" ><i class="fa fa-remove"></i>删除</a> ');
    return actions.join('');
}

//编辑/新增--模态框
var childs = [];

function insert() {
    $(".modal").modal("toggle");
    $("#id").val("");
    $("#siteName").val("");
    $("#siteStatus").val("请选择");
}

$('#btn_cancel').click(function () {
    $(".modal").modal("hide");
})

$('#btn_confirm').click(function () {
    $('[name="published"]').val(false);
    $('#blog-form').submit();

    //校验
    if($("#siteName").val() == ""){
        toastr.error("请填写场地名称");
    }

    if("请选择" == $("#siteStatus").val()){
        toastr.error("请选择场地状态");
    }


    var id = $("#id").val();
    var siteName = $("#siteName").val();
    var siteStatus = $("#siteStatus").val();


    $.ajax({
        url: "/kq/site/insertSite",
        type: "post",
        dataType: "json",
        data: {
            "id":id,
            "siteName": siteName,
            "siteStatus": siteStatus
        },
        success: function (res) {
            console.info(res)
            if (res.code == 20000) {
                //关闭对话框
                $(".modal").modal("hide");
                //清空文本框
                $("#siteName").val("");
                $("#siteStatus").val("");

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
        url: "/kq/site/delete/"+uIdText,
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
    console.info(uIdText)

    $.ajax({
        type: "get",
        url: "/kq/site/"+uIdText,
        dataType: "JSON",
        async: false,
        success: function (data) {
            var e = data.data.site;
            if (e.id == uIdText) {
                $("#id").val(e.id);
                $("#siteName").val(e.siteName);
                $("#siteStatus").val(e.siteStatus);
            }

        }
    });


}



//搜索
function search2() {

    var id = $("#sid").val().trim();
    var siteName = $("#sname").val().trim();
    var siteStatus = $("#sstatus").val();

    $.ajax({
        url: "/kq/site/selectList",
        type: "get",
        dataType: "json",
        data: {
            "id": id,
            "siteName": siteName,
            "siteStatus": siteStatus
        },
        success: function (data) {
            var options = {
                data: data.sites,
                id: "id",
                modalName: "场地",
                columns: [
                    {
                        field: 'id',
                        title: '场地编号',
                        align: "center",
                        sortable: true

                    }, {
                        field: 'siteName',
                        title: '场地名称',
                        align: "center",
                        sortable: true
                    }, {
                        field: 'siteStatus',
                        title: '状态',
                        align: "center",
                        formatter: formatterStatus
                    },{
                        title: '操作',
                        align: 'center',
                        formatter: formatterOpt
                    }
                ]
            }
            $.mytable.initTable(options);
            $("#reportTable").bootstrapTable("load", data.data.sites);
        }
    })

}

//置空
function rezero() {
    $("#sid").val("");

    $("#sname").val("");

    $("#sstatus").val("0");
}

