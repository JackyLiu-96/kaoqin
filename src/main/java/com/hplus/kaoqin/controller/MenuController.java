package com.hplus.kaoqin.controller;

import com.hplus.kaoqin.common.vo.R;
import com.hplus.kaoqin.entity.Menu;
import com.hplus.kaoqin.entity.Shift;
import com.hplus.kaoqin.service.MenuService;
import com.hplus.kaoqin.service.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author LiuJiang
 * @date 2020/12/24 9:25
 */
@RestController
@RequestMapping("/kq/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping("/list")
    public R list() {
        List<Menu> menus = menuService.list(null);
        return R.ok().data("menus", menus);
    }
}
