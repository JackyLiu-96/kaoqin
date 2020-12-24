package com.hplus.kaoqin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hplus.kaoqin.entity.Merchant;

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

    /**
     * 查询所有
     * @return
     */
    List<Merchant> getMerchantList();
}
