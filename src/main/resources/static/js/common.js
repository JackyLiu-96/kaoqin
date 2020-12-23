(function ($) {
    $.extend({
        table: {
            _options: {},
            init: function (options) {
                $.table._options = options;
                $("#bootstrap-table").bootstrapTable({
                    // url: options.urlName + "/list", // 请求后台的URL（*）
                    url: options.url, // 请求后台的URL（*）
                    columns: options.columns,
                    sortName: options.sortName,
                    sortOrder: options.sortOrder, // 排序方式
                    uniqueId: options.id, // 每一行的唯一标识，一般为主键列
                    contentType: "application/x-www-form-urlencoded",
                    sidePagination: "client", // 分页方式：client客户端分页，server服务端分页（*）
                    queryParams: function (params) {
                        var search = {};
                        $.each($("#searchForm").serializeArray(), function (i, field) {
                            search[field.name] = field.value
                        });
                        search.pageSize = params.limit;
                        search.pageNo = params.offset / params.limit + 1;
                        search.orderColumn = params.sort;
                        search.orderStyle = params.order;
                        return search;
                    },
                    method: 'get', // 请求方式（*）
                    toolbar: '#toolbar', // 工具按钮用哪个容器
                    search: false, // 是否显示表格搜索
                    showFooter: false, // 显示底部，默认不显示
                    striped: true, // 是否显示行间隔色
                    cache: false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true, // 是否显示分页（*）
                    showPaginationSwitch: false, // 显示切换分页
                    showFullscreen: false, // 显示全屏
                    showHeader: true, // 显示头部，默认显示
                    showExport: true, // 显示导出
                    showColumns: true, // 是否显示所有的列（选择显示的列）
                    showRefresh: true, // 是否显示刷新按钮
                    sortable: true, // 是否启用排序
                    pageNumber: 1, // 初始化加载第一页，默认第一页,并记录
                    pageSize: 10, // 每页的记录行数（*）
                    pageList: [10, 15, 20], // 可供选择的每页的行数（*）

                    strictSearch: true,
                    minimumCountColumns: 2, // 最少允许的列数
                    clickToSelect: true, // 是否启用点击选中行
                    showToggle: true, // 是否显示详细视图和列表视图的切换按钮
                    cardView: false, // 是否显示详细视图
                    detailView: false, // 是否显示父子表
                });
            },
            refresh: function () {
                $("#bootstrap-table").bootstrapTable('refresh');
            },
            search: function () {
                var params = $("#bootstrap-table").bootstrapTable("getOptions");
                params.queryParams = function (params) {
                    var search = {};
                    $.each($("#searchForm").serializeArray(), function (i, field) {
                        search[field.name] = field.value
                    });
                    search.pageSize = params.limit;
                    search.pageNo = params.offset / params.limit + 1;
                    search.orderColumn = params.sort;
                    search.orderStyle = params.order;
                    return search;
                };
                $("#bootstrap-table").bootstrapTable("refresh", params)
            }
        },
        tree: {
            settings: {},
            zNodes: {},
            init: function (treeOptions) {
                $.tree._treeOptions = treeOptions;
                var tree;
                var setting = {
                    check: {
                        enable: treeOptions.checkFlag == null ? false : treeOptions.checkFlag,
                        nocheckInherit: treeOptions.checkFlag == null ? false : treeOptions.checkFlag
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: treeOptions.id,
                            pIdKey: treeOptions.parentId
                        },
                        key: {
                            name: treeOptions.name
                        }
                    },

                    callback: {
                        /*
                         * beforeClick: function zTreeBeforeClick(treeId, treeNode, clickFlag) { return !treeNode.isParent;//当是父节点 返回false 不让选取 },
                         */
                        onClick: treeOptions.clk
                    }
                };
                $.tree.settings = setting;
                $.ajax({
                    post: $.common.isEmpty(treeOptions.method) ? "post" : treeOptions.method,
                    url: treeOptions.url,
                    dataType: $.common.isEmpty(treeOptions.dataType) ? "json" : treeOptions.dataType,
                    success: function (data) {
                        $.tree.zNodes = data;
                        tree = $.fn.zTree.init($("#tree"), setting, data);
                        tree.expandAll(treeOptions.expand == null ? true : treeOptions.expand);
                    }
                });

                // 图标交替显示
                $(".changeMenu").click(function () {
                    $(".changeMenu").toggle();
                });

                // 部门菜单显示
                $("#btnExpand").click(function () {
                    // var treeObj = $.fn.zTree.getZTreeObj("tree");
                    tree.expandAll(true);
                });
                // 部门菜单折叠
                $("#btnCollapse").click(function () {
                    // var treeObj = $.fn.zTree.getZTreeObj("tree");
                    tree.expandAll(false);
                });

                // 菜单刷新按钮
                $("#btnRefresh").click(function () {
                    var tree = $.fn.zTree.init($("#tree"), $.tree.settings, $.tree.zNodes);
                    // 展开第一级节点
                    var nodes = tree.getNodesByParam("level", 0);
                    for (var i = 0; i < nodes.length; i++) {
                        tree.expandNode(nodes[i], true, false, false);
                    }
                    // 展开第二级节点
                    nodes = tree.getNodesByParam("level", 1);
                    for (var i = 0; i < nodes.length; i++) {
                        tree.expandNode(nodes[i], true, false, false);
                    }

                });
            },
            getChildren: function (ids, treeNode) {
                // ids是一个数组 返回结果数组 treeNode是选中的节点
                ids.push(treeNode.deptId);
                if (treeNode.isParent) {
                    for (var obj in treeNode.children) {
                        this.getChildren(ids, treeNode.children[obj]);
                    }
                }
                return ids;
            },
            search: function (value) {
                // 当前树
                var tree = $.fn.zTree.getZTreeObj("tree");
                // 所有节点
                var nodes = tree.getNodes();
                if ($.common.isEmpty(value)) {
                    this.showAllNode(nodes);
                    return;
                }
                this.hideAllNode(nodes);
                var nodeList = tree.getNodesByParamFuzzy(treeOptions.name, $("#keyword").val());
                this.updateNodes(nodeList);
            },
            showAllNode: function (nodes) {
                var tree = $.fn.zTree.getZTreeObj("tree");
                nodes = tree.transformToArray(nodes);
                for (var i = nodes.length - 1; i >= 0; i--) {
                    if (nodes[i].getParentNode() != null) {
                        tree.expandNode(nodes[i], false, false, false, false);
                    } else {
                        tree.expandNode(nodes[i], true, true, false, false);
                    }
                    tree.showNode(nodes[i]);
                    this.showAllNode(nodes[i].children);
                }
            },
            hideAllNode: function (nodes) {
                var tree = $.fn.zTree.getZTreeObj("tree");
                nodes = tree.transformToArray(nodes);
                for (var i = nodes.length - 1; i >= 0; i--) {
                    tree.hideNode(nodes[i]);
                }
            },
            updateNodes: function (nodeList) {
                var tree = $.fn.zTree.getZTreeObj("tree");
                tree.showNodes(nodeList);
                for (var i = 0, l = nodeList.length; i < l; i++) {
                    var treeNode = nodeList[i];
                    this.showChildren(treeNode);
                    this.showParent(treeNode)
                }
            },
            showChildren: function (treeNode) {
                var tree = $.fn.zTree.getZTreeObj("tree");
                if (treeNode.isParent) {
                    for (var idx in treeNode.children) {
                        var node = treeNode.children[idx];
                        tree.showNode(node);
                        this.showChildren(node);
                    }
                }
            },
            showParent: function (treeNode) {
                var tree = $.fn.zTree.getZTreeObj("tree");
                var parentNode;
                while ((parentNode = treeNode.getParentNode()) != null) {
                    tree.showNode(parentNode);
                    tree.expandNode(parentNode, true, false, false);
                    treeNode = parentNode;
                }
            }
        },
        tableTreegrid: {
            _options: {},
            init: function (options) {
                $.tableTreegrid._options = options;
                $table.bootstrapTable({
                    url: options.url,
                    height: $(window).height(),
                    method: 'get', //请求方式（*）
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    toolbar: '#toolbar', //工具按钮用哪个容器
                    striped: true, //是否显示行间隔色
                    cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: false, //是否显示分页（*）
                    sortable: false, //是否启用排序
                    sidePagination: "client", //分页方式：client客户端分页client客户端分页，server服务端分页（*）
                    pageNumber: 1, //初始化加载第一页，默认第一页
                    pageSize: 10, //每页的记录行数（*）
                    pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）

                    idField: options.id,
                    columns: options.columns,
                    // bootstrap-table-treegrid.js 插件配置 -- start

                    //在哪一列展开树形
                    treeShowField: options.showField,
                    //指定父id列
                    parentIdField: options.pid,

                    onResetView: function (data) {
                        $table.treegrid({
                            // initialState: 'collapsed',// 所有节点都折叠
                            initialState: 'expanded',// 所有节点都展开，默认展开
                            treeColumn: 1,
                            expanderExpandedClass: 'glyphicon glyphicon-chevron-down',  //图标样式
                            expanderCollapsedClass: 'glyphicon glyphicon-chevron-right',
                            onChange: function () {
                                $table.bootstrapTable('resetWidth');
                            }
                        });


                    },
                    onCheck: function (row) {
                        var datas = $table.bootstrapTable('getData');
                        // 勾选子类
                        selectChilds(datas, row, options.id, options.pid, true);
                        // 勾选父类
                        selectParentChecked(datas, row, options.id, options.pid);
                        // 刷新数据
                        $('#table').bootstrapTable('load', datas);
                    },

                    onUncheck: function (row) {
                        var datas = $table.bootstrapTable('getData');
                        selectChilds(datas, row, options.id, options.pid, false);
                        $('#table').bootstrapTable('load', datas);
                    },
                    // bootstrap-table-treetreegrid.js 插件配置 -- end

                });
            },

        },
        treeTable: {
            _options: {},
            // 初始化表格
            init: function (options) {
                $.treeTable._options = options;
                var treeTable = $('#bootstrap-table').bootstrapTreeTable({
                    id: options.id,
                    parentId: options.parentId,
                    url: options.urlName + "/list", // 请求后台的URL（*）
                    columns: options.columns,
                    type: 'GET',                   // 请求方式（*）
                    ajaxParams: {},               // 请求数据的ajax的data属性
                    expandColumn: options.expandCol,            // 在哪一列上面显示展开按钮
                    striped: false,               // 是否各行渐变色
                    bordered: true,               // 是否显示边框
                    expandAll: false,                // 是否全部展开
                    expandFirst: options.expandFlag, // 是否默认第一级展开--expandAll为false时生效
                    toolbar: "#toolbar"    // 顶部工具条
                });
            },
            // 条件查询
            search: function (formId) {
                var params = {};
                $.each($("#searchForm").serializeArray(), function (i, field) {
                    params[field.name] = field.value;
                });
                $("#bootstrap-table").bootstrapTreeTable('refresh', params);
            },
            // 刷新
            refresh: function () {
                $("#bootstrap-table").bootstrapTreeTable('refresh');
            }
        },
        form: {
            // 重置
            reset: function (formId) {
                var currentId = $.common.isEmpty(formId) ? $('form').attr('id') : formId;
                $("#" + currentId)[0].reset();
            },
            // 选中筛选框
            selectCheckeds: function (name) {
                var checkeds = "";
                $('input:checkbox[name="' + name + '"]:checked').each(function (i) {
                    if (0 == i) {
                        checkeds = $(this).val();
                    } else {
                        checkeds += ("," + $(this).val());
                    }
                });
                return checkeds;
            },
            // 选中单选框
            selectSelects: function (name) {
                var selects = "";
                $('#' + name + ' option:selected').each(function (i) {
                    if (0 == i) {
                        selects = $(this).val();
                    } else {
                        selects += ("," + $(this).val());
                    }
                });
                return selects;
            }
        },
        modal: {
            confirm: function (message, callBack) {
                layer.confirm(message, {
                    icon: 3,
                    title: "系统提示",
                    skin: 'layui-layer-molv', // 样式类名
                    btn: ["确认", "取消"],
                    btnclass: ["btn btn-primary", "btn btn-danger"],
                }, function (index) {
                    layer.close(index);
                    callBack()
                })
            },
            msg: function (content, type) {
                if (type != undefined) {
                    layer.msg(content, {
                        icon: type,
                        time: 1000,
                        shift: 5,
                        shade: 0.1
                    });
                } else {
                    layer.msg(content)
                }
            },
            alert: function (content, type) {
                if (type != undefined) {
                    layer.alert(content, {
                        icon: type,
                        title: "系统提示",
                        btn: ["确认"],
                        btnclass: ["btn btn-primary"],
                    })
                } else {
                    layer.alert(content)
                }
            },
            open: function (title, url, width, height) {
                if ($.common.isEmpty(title)) {
                    title = false
                }
                if ($.common.isEmpty(url)) {
                    url = "404.html"
                }
                if ($.common.isEmpty(width)) {
                    width = 800
                }
                if ($.common.isEmpty(height)) {
                    height = ($(window).height() - 50)
                }
                layer.open({
                    type: 2,
                    area: [width + "px", height + "px"],
                    fix: false,
                    maxmin: true,
                    shade: 0.3,
                    title: title,
                    content: url
                })
            },
            openHTML: function (title, id, width, height, callback) {
                if ($.common.isEmpty(title)) {
                    title = false
                }
                if ($.common.isEmpty(width)) {
                    width = 800
                }
                if ($.common.isEmpty(height)) {
                    height = ($(window).height() - 50)
                }
                layer.open({
                    type: 1,
                    area: [width + "px", height + "px"],
                    fix: false,
                    maxmin: true,
                    shade: 0.3,
                    title: title,
                    content: id,
                    btn: ['确定', '取消'], //按钮组
                    yes: callback
                })
            },
            close: function () {
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index)
            },
            loading: function (message) {
                $.blockUI({
                    message: '<div class="loaderbox"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i> ' + message + '</div>'
                })
            },
            closeLoading: function () {
                setTimeout(function () {
                    $.unblockUI()
                }, 50)
            },
            alertWarning: function (content) {
                $.modal.alert(content, 3);
            },
            alertError: function (content) {
                $.modal.alert(content, 2);
            },
            alertSuccess: function (content) {
                $.modal.alert(content, 1);
            },
            msgWarning: function (content) {
                $.modal.msg(content, 3)
            },
            msgError: function (content) {
                $.modal.msg(content, 2)
            },
            msgSuccess: function (content) {
                $.modal.msg(content, 1)
            }
        },
        operate: {
            submit: function (url, data, ope, method, dataType) {
                $.modal.loading("正在处理中，请稍后...");
                $.ajax({
                    url: url,
                    data: data,
                    method: $.common.isEmpty(method) ? "post" : method,
                    dataType: $.common.isEmpty(dataType) ? "json" : dataType,
                    success: function (res) {
                        if (res.code == 0) {
                            if ($.common.isEmpty(ope) || ope == "remove") {
                                // 刷新当前页
                                $.modal.msgSuccess(res.message);
                                if (jQuery.isEmptyObject($.table._options)) {
                                    $.treeTable.refresh();
                                } else {
                                    $.table.refresh();
                                }
                            } else {
                                // 关模态，刷新另一页
                                $.modal.msgSuccess("保存成功,正在刷新数据请稍后……");
                                parent.location.reload();
                            }
                        } else {
                            $.modal.alertError(res.message);
                        }
                        $.modal.closeLoading();
                    }
                });
            },
            remove: function (id) {
                var url = "";
                if (jQuery.isEmptyObject($.table._options)) {
                    url = $.treeTable._options.urlName;
                } else {
                    url = $.table._options.urlName;
                }

                if ($.common.isEmpty(id)) {
                    var rows = $("#bootstrap-table").bootstrapTable("getSelections");
                    if (rows.length == 0) {
                        $.modal.alertWarning("请至少选择一条记录");
                        return
                    }
                    $.modal.confirm("确认要删除选中的" + rows.length + "条数据吗?", function () {
                        var ids = [];
                        $(rows).each(function (index, item) {
                            ids.push(item[$.table._options.id]);
                        });
                        var data = {
                            "_method": "DELETE"
                        };
                        $.operate.submit(url + "/" + ids.join(","), data, "remove");
                    })
                } else {
                    $.modal.confirm("确认要删除选当前行的数据吗?", function () {
                        var data = {
                            "_method": "DELETE"
                        };
                        $.operate.submit(url + "/" + id, data, "remove");
                    })
                }
            },
            reset: function (id) {

                $.operate.submit("UserServlet?method=reset", "id=" + id, "remove");
            },
            add: function (pid) {
                if (jQuery.isEmptyObject($.table._options)) {
                    var url = $.treeTable._options.urlName + "/to_add";
                    if (!$.common.isEmpty(pid)) {
                        url = url + "/" + pid
                    }
                    $.modal.open("添加" + $.treeTable._options.modalName, url);
                } else {
                    $.modal.open("添加" + $.table._options.modalName, $.table._options.urlName + "/to_add");
                }
            },
            edit: function (id) {
                if (jQuery.isEmptyObject($.table._options)) {
                    $.modal.open("修改" + $.treeTable._options.modalName, $.treeTable._options.urlName + "/to_update/" + id);
                } else {
                    $.modal.open("修改" + $.table._options.modalName, $.table._options.urlName + "/to_update/" + id);
                }
            },
            look: function (id) {
                if (jQuery.isEmptyObject($.table._options)) {
                    $.modal.open("查看" + $.treeTable._options.modalName, $.treeTable._options.urlName + "to_look/" + id);
                } else {
                    $.modal.open("查看" + $.table._options.modalName, $.table._options.urlName + "/to_look/" + id);
                }
            }
        },
        common: {

            /* 字段名以字符串的形式传入 */
            setTreeData:function (arr,children,id,pId){
                var tree = arr.filter(a=>{


                    var child=	arr.filter(b=>{

                        return b[pId]==a[id]
                    })

                    a[children]=child;

                    return a[pId]==0;
                })
                return tree;
            },

            isEmpty: function (value) {
                if (value == null || this.trim(value) == "") {
                    return true
                }
                return false
            },
            trim: function (value) {
                if (value == null) {
                    return ""
                }
                return value.toString().replace(/(^\s*)|(\s*$)|\r|\n/g, "")
            }
        }
    })
})(jQuery);

