package com.hplus.kaoqin.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.hplus.kaoqin.entity.Merchant;
import com.hplus.kaoqin.querry.MerchantQuery;

import java.util.List;
import java.util.Map;

/**
 * @author LiuJiang
 * @date 2020/12/24 9:28
 */
public interface MerchantService  extends IService<Merchant> {

    /**
     * 条件查询
     * @param map
     * @return
     */
    List<Merchant> selectByMap(Map map);

    int insertMerchant(Merchant merchant);

    int updateMerchantById(Merchant merchant);

    /**
     * 条件查询
     */
    List<Merchant> selectCondition(QueryWrapper<Merchant> queryWrapper, MerchantQuery merchantQuery);
}
