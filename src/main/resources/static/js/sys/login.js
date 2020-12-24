/**
 * Created by Administrator on 2019/9/3.
 */
/*toastr.success("成功样式");
 toastr.warning("警告样式");
 toastr.error("错误样式");
 toastr.info("提示样式");*/

$(function () {
    $("#login").click(function () {
        var uname = $("#username").val();
        var psw = $("#password").val();
        if (uname == "") {
            toastr.info("用户名不能为空");
        } else if (psw == "") {
            toastr.info("密码不能为空");
        }
        $.post(
            "/kq/user/login",
            "username=" + uname + "&password=" + psw,
            function (data) {
                if (data.code == 20000) {
                    toastr.success("登录成功！")
                    window.location = "index.html"
                } else {
                    toastr.error("用户名或密码错误！");
                }
            }
        )
    })
})


