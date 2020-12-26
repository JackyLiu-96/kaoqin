package com.hplus.kaoqin.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.hplus.kaoqin.common.vo.R;
import com.hplus.kaoqin.entity.Employee;
import com.hplus.kaoqin.entity.Shift;
import com.hplus.kaoqin.entity.Site;
import com.hplus.kaoqin.querry.EmployeeQuerry;
import com.hplus.kaoqin.querry.SiteQuerry;
import com.hplus.kaoqin.service.ShiftService;
import com.hplus.kaoqin.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author LiuJiang
 * @date 2020/12/24 9:25
 */
@RestController
@RequestMapping("/kq/site")
public class SiteController {

    @Autowired
    private SiteService siteService;

    @GetMapping("/list")
    public R list() {
        List<Site> sites = siteService.list(null);
        return R.ok().data("sites", sites);
    }

    @PostMapping("/insertSite")
    public R insertSite(@RequestParam(value = "id") String id,
                        @RequestParam(value = "siteName") String siteName,
                        @RequestParam(value = "siteStatus") String siteStatus) {
        Site site = new Site();
        site.setSiteName(siteName);
        site.setSiteStatus(siteStatus);
        site.setDeleted(false);
        if (id == "") {
            int flag = siteService.insertSite(site);
            if (flag == 1) {
                return R.ok().message("新增成功");
            } else {
                return R.error().message("新增失败");
            }
        } else {
            site.setId(id);
            int flag = siteService.updateSite(site);
            if (flag == 1) {
                return R.ok().message("修改成功");
            } else {
                return R.error().message("修改失败");
            }
        }
    }

    @GetMapping(value = "{id}")
    public R findById(@PathVariable(name = "id", required = true) String id) {
        Site site = siteService.getById(id);
        return R.ok().data("site", site);
    }

    @PostMapping("/delete/{id}")
    public R deleteById(@PathVariable String id) {
        Boolean flag = siteService.removeById(id);
        if (flag == true) {
            return R.ok().message("删除成功");
        } else {
            return R.error().message("删除失败");
        }
    }

    @GetMapping("/selectList")
    public R selectList(@RequestParam(value = "id") String id,
                        @RequestParam(value = "siteName") String siteName,
                        @RequestParam(value = "siteStatus") String siteStatus) {
        QueryWrapper<Site> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByAsc("id");
        SiteQuerry siteQuerry = new SiteQuerry();
        siteQuerry.setId(id);
        siteQuerry.setSiteName(siteName);
        siteQuerry.setSiteStatus(siteStatus);
        List<Site> sites = siteService.selectQuery(queryWrapper, siteQuerry);
        return R.ok().data("sites", sites);
    }
}
