package com.hplus.kaoqin.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.hplus.kaoqin.entity.Employee;
import com.hplus.kaoqin.entity.Shift;
import com.hplus.kaoqin.entity.Site;
import com.hplus.kaoqin.querry.SiteQuerry;

import java.util.List;
import java.util.Map;

/**
 * @author LiuJiang
 * @date 2020/12/24 9:28
 */
public interface SiteService extends IService<Site> {

    int insertSite(Site site);

    int updateSite(Site site);

    List<Site> selectQuery(QueryWrapper<Site> queryWrapper, SiteQuerry siteQuerry);
}
