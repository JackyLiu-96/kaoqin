package com.hplus.kaoqin.controller;


import com.hplus.kaoqin.common.vo.R;
import com.hplus.kaoqin.entity.User;
import com.hplus.kaoqin.service.UserService;
import com.hplus.kaoqin.util.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author jacky
 * @since 2020-12-23
 */
@RestController
@RequestMapping("/kq/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public R login(@RequestParam String username,@RequestParam String password){
        User user = userService.findBynameAndPwd(username, MD5Utils.code(password));
        if(user == null){
            return R.error().message("用户名或密码错误");
        }
        return R.ok().data("user",user);
    }
}

