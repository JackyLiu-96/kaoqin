package com.hplus.kaoqin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hplus.kaoqin.entity.Site;
import com.hplus.kaoqin.mapper.SiteMapper;
import com.hplus.kaoqin.querry.SiteQuerry;
import com.hplus.kaoqin.service.SiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;


/**
 * @author LiuJiang
 * @date 2020/12/24 9:29
 */
@Service
public class SiteServiceImpl extends ServiceImpl<SiteMapper, Site> implements SiteService {

    @Autowired
    private SiteMapper siteMapper;

    @Override
    public int insertSite(Site site) {
        return siteMapper.insert(site);
    }

    @Override
    public int updateSite(Site site) {
        return siteMapper.updateById(site);
    }

    @Override
    public List<Site> selectQuery(QueryWrapper<Site> queryWrapper, SiteQuerry siteQuerry) {
        if (!StringUtils.isEmpty(siteQuerry.getId())) {
            queryWrapper.eq("id", siteQuerry.getId());
        }

        if (!StringUtils.isEmpty(siteQuerry.getSiteName())) {
            queryWrapper.like("site_name", siteQuerry.getSiteName());
        }

        if (!StringUtils.isEmpty(siteQuerry.getSiteStatus()) && !"0".equals(siteQuerry.getSiteStatus())) {
            queryWrapper.eq("site_status", siteQuerry.getSiteStatus());
        }
        return baseMapper.selectList(queryWrapper);
    }
}
