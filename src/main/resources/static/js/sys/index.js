/**
 * Created by Administrator on 2019/9/2.
 */
//入口
$(function () {
    $.ajax({
        url:"/kq/menu/list",
        dataType:"JSON",
        success:function (data) {
            var trees = getTree(data.data.menus);
            $.each(trees,function (i,e) {
                var $lis = $("<li>",{
                    html:" <a href='#'><i class='fa fa-cutlery'></i><span class='nav-label'>"+e.menuName+"</span></a>"
                })
                $lis.appendTo($("#side-menu"));
                var $ul = $("<ul>",{
                    class:"nav nav-second-level "
                })
                $ul.appendTo($lis)
                $.each(e.children,function (i,m) {
                    var $lis1 = $("<li>")
                    var $a = $("<a>",{
                        class:"J_menuItem",
                        text:m.menuName
                    })

                    $a.click(function () {       //a标签设点击事件:跳转
                        jump(m)
                    })
                    $a.appendTo($lis1)
                    $lis1.appendTo($ul)
                })
            })
        },
        error:function () {

        }
    });


})


//得到所有树节点
function getTree(data) {
    var trees= data.filter(function (e) {
        var childs = data.filter(function (m) {
            return e.id==m.parentId;
        })
        console.log(childs.length+"===")
        if(childs.length!=0){
            e.children=childs;
        }

        return e.parentId==0;
    })
    return trees;
}

//跳转
function jump(data) {
    $("#content-main").empty();
    var $iframe = $("<iframe>",{
        class:"J_iframe",
        width:"100%",
        height:"100%",
        src:data.url+"?v=4.0",
        frameborder:"0"
    });
    $iframe.appendTo($("#content-main"));
}

