
//入口
$(function() {
        myinit();

    });

//初始化
function myinit() {
    var data=[];
    $.ajax({
        url:"../../data/sys/dept.json",
        dataType:"JSON",
        async:false,
        success:function (data1) {
            data=data1;
            var options = {data:data,
                idField: 'deptId',
                columns: [
                    { field: 'check',  checkbox: true},
                    { field: 'deptName',  title: '部门名称' },
                    {field: 'orderNum', title: '排序', sortable: true, align: 'center'},
                    {field: 'status', title: '状态', align: "center", formatter:formatterStatus},
                    {field: 'createTimeStr', title: '创建时间', align: "center", },
                    {title: '操作', align: 'center', formatter: formatterOpt}
                ],

                // bootstrap-table-treegrid.js 插件配置 -- start

                //在哪一列展开树形
                treeShowField: 'deptName',
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
                    /*$('#reportTable').treegrid('getRootNodes').treegrid('expand');*/

                }
            };
            $.mytreetable.initTtable(options);
        }
        ,
        error:function () {

        }
    });
}


//状态格式化
function formatterStatus(value, row, index) {
    if (value == '01') {
        return '<span class="badge badge-info">正常</span>';
    } else if (value == '02') {
        return '<span class="badge badge-danger">停用</span>';
    }
}

//操作格式化
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
var meetDates=[];    //满足条件的数组
function searchs() {

    $.getJSON("../../data/sys/dept.json",function (data){

        var dname = $("#dname").val().trim();
        var dstatus = $("#dstatus").val().trim();
        fathers =[];                            //搜索前置为空，在此搜索刷新表格
        father=[];
        childs =[];
        arr=[];
        meetDates=[];
        $.each(data, function (i, e) {
            if ((e.deptName).includes(dname) && (e.status).includes(dstatus)) {
                meetDates.push(e)
            }

        })
        findFatherNodes(meetDates,data);
        findChildrenNodes(meetDates,data)
        /* console.info(childs)*/

        var flag=true;
        $.each(fathers,function (i,e) {
            if(e.parentId==0){          //如果是最上级节点->万和集团，标记为置为false
                flag=false;
            }
        });
        if(flag){               //不是最上级节点，中间的直接父节点，将属性parentId设为0，其子节点放入数组
            $.each(fathers,function (i,e) {
                e.parentId=0;
                childs.push(e)
            });
        }else{                  //是最上级节点,将其子节点放入数组
            $.each(fathers,function (i,e) {
                childs.push(e)
            });
        }

        $.each(meetDates,function (i,e) {
            childs.push(e)
        });


        var s = Array.from(new Set(childs));   //childs  去重
        $('#reportTable').bootstrapTable("load",s)

    })

}


//找出指定对象的直接父节点
var father=[];  //直接父节点
var fathers=[]; //去重后直接父节点
function findFatherNodes(meetDates,data) {
    $.each(meetDates,function (i,e) {
        $.each(data,function (j,m) {
            if(e.parentId==m.deptId){
                father.push(m)      //直接父节点放入数组

            }
        })
    })
    fathers = Array.from(new Set(father))  //数组去重
}

//找出指定对象的子节点，如果字节点还有子节点，继续递归
var childs=[];// 指定对象的子节点
function findChildrenNodes(meetDates,data) {
    var ch=[];
    $.each(meetDates,function (i,e) {
        $.each(data,function (j,m) {
            if(e.deptId==m.parentId){
                childs.push(m);
                ch.push(m)
            }
        })
    })
    if(ch.length!=0){      //判断是否查询结束(递归头)
        findChildrenNodes(ch,data)
    }

}





//编辑  --模态框
var children = [];
function update(x) {
    $(".modal").modal("toggle")
    children = x.parentNode.parentNode.childNodes;
    /*console.info(children)*/
    var deptName = $(children[3]).text();
    console.info(deptName)


    $.getJSON("../../data/sys/dept.json",function (data){
        $.each(data,function (i,e) {
            if((e.deptName+"")==deptName){
                $("#deptName").val(e.deptName);
                $("#dsort").val(e.orderNum);
                $("#dctime").val(e.createTimeStr);
                $("#dta").val(e.status);
            }
        })
    })


}

//下拉框赋值
var sel = ["0","01","02"];
for(var i=0;i<sel.length;i++) {
    var $option = $("<option>", {
        text: sel[i]
    })
    $option.appendTo($("#dta"));
}


//重置
function rezero() {
    $("#dname").val("");
    $("#dstatus").val("");

}
