/**
 * Created by Administrator on 2019/9/2.
 */
//入口
$(function () {
        $("#app").css("height",$(window).height());
        $('#app').layout({});

        btable();

    });

//table
function btable() {

    $.ajax({
        url:"../../data/sys/roles.json",
        dataType:"JSON",
        success:function (ds) {
            var options = {
                data: ds,
                method: 'get',
                sortName: "roleId",
                sortOrder: "desc",
                id: "roleId",
                modalName: "角色",
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
                        field: 'roleId',
                        title: '角色ID',
                        align: "center",
                        sortable: true

                    }, {
                        field: 'roleName',
                        title: '角色名',
                        align: "center",
                        sortable: true
                    }, {
                        field: 'roleSort',
                        title: '排序',
                        align: "center",
                        sortable: true
                    }, {
                        field: 'createTime',
                        title: '创建时间',
                        align: "center",
                        sortable: true
                    }, {
                        field: 'roleKey',
                        title: '权限字符',
                        align: "center",
                        sortable: true
                    }, {
                        field: 'status',
                        title: '状态',
                        align: "center",
                        formatter: formatterStatus
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
    if (value == '01') {
        return '<span class="badge badge-danger">启用</span>';
    } else if (value == '02') {
        return '<span class="badge badge-success">停用</span>';
    }
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
function search2() {
    var d=[];
    $.getJSON("../../data/sys/roles.json",function (data){

        var rname = $("#rname").val().trim();
        var rkey= $("#rkey").val().trim();
        var rstatus = $("#rstatus").val().trim();

        //满足条件
        $.each(data,function (i,e) {
            if((e.roleName).includes(rname)&&(e.roleKey).includes(rkey)&&(e.status).includes(rstatus)){
                d.push(e);
            }

        });
        //表格加载
        $("#reportTable").bootstrapTable("load",d);
    })

}

//置空
function rezero() {
    $("#rname").val("");

    $("#rkey").val("");

    $("#rstatus").val("");
}

