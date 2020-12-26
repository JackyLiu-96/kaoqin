package com.hplus.kaoqin.controller;

import com.hplus.kaoqin.common.vo.R;
import com.hplus.kaoqin.entity.Role;
import com.hplus.kaoqin.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author Wangxiang
 * @Date 2020/12/26 20:50
 */
@RestController
@RequestMapping("/kq/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    /**
     * 查所有角色
     */
    @GetMapping("/roleList")
    public R roleList(){
        List<Role> roles = roleService.list(null);
        return R.ok().data("roles",roles);
    }
}
