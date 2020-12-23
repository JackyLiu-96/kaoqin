/**
 * Created by Administrator on 2019/9/3.
 */
/*toastr.success("成功样式");
 toastr.warning("警告样式");
 toastr.error("错误样式");
 toastr.info("提示样式");*/

$(function () {
    var flag = false;
    $("#login").click(function () {
        var uname = $("#username").val();
        var psw = $("#password").val();
        $.getJSON("data/sys/user.json",function (data) {
            if(uname==""){
                toastr.info("用户名不能为空");
            }else if(psw==""){
                toastr.info("密码不能为空");
            }
            else{
                $.each(data,function (i,e) {
                    if(e.loginName==uname && e.password==psw){
                        flag=true;
                    }
                })
                if(flag==true){
                    toastr.success("登录成功！")
                    window.location="index.html"
                }else{
                    toastr.error("用户名或密码错误！");
                }

            }

        })
    })
})


