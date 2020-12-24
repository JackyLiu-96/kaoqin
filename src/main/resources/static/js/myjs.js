    $.extend({

        //table
        mytable: {
            initTable: function (options) {
                $("#reportTable").bootstrapTable({
                    /* url:'json/stu.json', //请求后台的url*/
                    data: options.data,
                    method: 'get',       //请求方式
                    pagination: true,    //是否显示分页
                    sidePagination: "client", // 分页方式 client为客户端  server为服务器端
                    pageNumber: 1,//初始化加载第一页，默认第一页
                    pageSize: 10,//每页的记录行数
                    pageList: [10, 15, 20, 25],// 可供选择的每页行数
                    showColumns: true,
                    columns: options.columns,
                    sortable: true,
                    showRefresh: true,
                    showFullscreen: true,
                    striped: true,
                    sortOrder: "desc",
                    id: options.id,
                    modalName: options.modalName,
                })


            }
        },

        //treeTable
        mytreetable:{
            initTtable:function (options) {
                $("#reportTable").bootstrapTable({
                    data:options.data,
                    idField: options.idField,
                    columns: options.columns,
                    //在哪一列展开树形
                    treeShowField: options.treeShowField,
                    //指定父id列
                    parentIdField: options.parentIdField,
                    onResetView: function (data) {
                        $("#reportTable").treegrid({
                            // initialState: 'collapsed',// 所有节点都折叠
                            initialState: 'expanded',// 所有节点都展开，默认展开
                            treeColumn: 1,
                            expanderExpandedClass: 'glyphicon glyphicon-chevron-down',  //图标样式
                            expanderCollapsedClass: 'glyphicon glyphicon-chevron-right',
                            onChange: function () {
                                $("#reportTable").bootstrapTable('resetWidth');
                            }
                        });
                    }
                })
            }
        },

        //z-tree
        myztree:{
            initZtree:function (options) {
                var setting = {
                    view: {
                        selectedMulti: false
                    },
                    /*开启简单数据结构*/
                    data:{
                        simpleData:{
                            enable:true,
                            idKey:options.idKey,
                            pIdKey:options.pIdKey
                        },
                        key:{
                            name:options.name
                        }
                    },
                    callback: {
                        onClick: options.onClick
                    }

                }


            }
        }
    });

