
    $(function () {
        $("#app").css("height",$(window).height());
        $('#app').layout({});

        btable();

    });
//table
function btable() {
    $.ajax({
        url:"../../data/sys/posts.json",
        dataType:"JSON",
        success:function (ds) {
            var options = {
                data: ds,
                method: 'get',
                sortName: "postId",
                sortOrder: "desc",
                id: "postId",
                modalName: "岗位",
                pagination: true,            //是否显示分页
                sidePagination: "client",       //分页方式：client
                pageNumber: 1,
                pageSize: 2,
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
                        field: 'postId',
                        title: '岗位编号',
                        align: "center",
                        sortable: true

                    }, {
                        field: 'postCode',
                        title: '岗位编码',
                        align: "center",
                        sortable: true
                    }, {
                        field: 'postName',
                        title: '岗位名称',
                        align: "center",
                        sortable: true
                    }, {
                        field: 'postSort',
                        title: '显示顺序',
                        align: "center",
                        sortable: true
                    }, {
                        field: 'status',
                        title: '状态',
                        align: "center",
                        formatter: formatterStatus
                    }, {
                        field: 'createTime',
                        title: '创建时间',
                        align: "center",
                        sortable: true
                    }, {
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
    if (value == '01') {
        return '<span class="badge badge-info">正常</span>';
    } else if (value == '02') {
        return '<span class="badge badge-danger">停用</span>';
    }
}
//操作初始化
function formatterOpt(value, row, index) {
    /* console.info(row)*/
    var actions = [];
    /*getVue();*/
    actions.push("<a name='bianji' class='btn btn-success btn-xs' onclick='update(this)'><i class='fa fa-edit'></i>编辑</a> ");
    actions.push('<a class="btn btn-danger btn-xs btnRemove" href="javascript:void(0);"  ><i class="fa fa-remove"></i>删除</a> ');
    actions.push('<a class="btn btn-info btn-xs btnRefresh" href="javascript:void(0);" ><i class="fa fa-key"></i>重置</a>');
    return actions.join('');
}

//下拉框赋值
var s = ["0","01","02"];
for(var i=0;i<s.length;i++){
    var $option = $("<option>",{
        text:s[i]
    })
    $option.appendTo($("#sta"));
}

//编辑
var childs = [];
function update(x) {
    $(".modal").modal("toggle")
    childs = x.parentNode.parentNode.childNodes;
    /*console.info(childs)*/
    var pIdText = $(childs[1]).text();
    /*console.info(uIdText)*/


    $.getJSON("../../data/sys/posts.json",function (data){
        $.each(data,function (i,e) {
            if((e.postId+"")==pIdText){
                $("#pId1").val(e.postId);
                $("#pcode1").val(e.postCode);
                $("#pname1").val(e.postName);
                $("#psort1").val(e.postSort);
                $("#pcreatTime").val(e.createTime);
                $("#sta").val(e.status);
            }
        })
    })



}

//搜索
function search3() {
    var d=[];
    $.getJSON("../../data/sys/posts.json",function (data){

        var pCode = $("#pCode").val().trim();
        var pname= $("#pname").val().trim();
        var pstatus = $("#pstatus").val().trim();


        $.each(data,function (i,e) {
            if((e.postCode).includes(pCode)&&(e.postName).includes(pname)&&(e.status).includes(pstatus)){
                d.push(e);
            }

        });

        $("#reportTable").bootstrapTable("load",d);
    })

}
//置空
function rezero() {
    $("#pCode").val("");

    $("#pname").val("");

    $("#pstatus").val("");
}

