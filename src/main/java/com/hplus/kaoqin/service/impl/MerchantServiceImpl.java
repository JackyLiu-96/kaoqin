package com.hplus.kaoqin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hplus.kaoqin.entity.Merchant;
import com.hplus.kaoqin.mapper.MerchantMapper;
import com.hplus.kaoqin.querry.MerchantQuery;
import com.hplus.kaoqin.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Map;


/**
 * @author LiuJiang
 * @date 2020/12/24 9:29
 */
@Service
public class MerchantServiceImpl extends ServiceImpl<MerchantMapper, Merchant> implements MerchantService {

    @Autowired
    private MerchantMapper merchantMapper;

    @Override
    public List<Merchant> selectByMap(Map map) {
        return merchantMapper.selectByMap(map);
    }

    @Override
    public int insertMerchant(Merchant merchant) {
        return merchantMapper.insert(merchant);
    }

    @Override
    public int updateMerchantById(Merchant merchant) {
        return merchantMapper.updateById(merchant);
    }

    @Override
    public List<Merchant> selectCondition(QueryWrapper<Merchant> queryWrapper, MerchantQuery merchantQuery) {
        if(!StringUtils.isEmpty(merchantQuery.getId()))
            queryWrapper.eq("id",merchantQuery.getId());
        if (!StringUtils.isEmpty(merchantQuery.getMerchantName())){
            queryWrapper.like("merchant_name",merchantQuery.getMerchantName());
        }
        if (!StringUtils.isEmpty(merchantQuery.getRoleName()) && !"请选择".equals(merchantQuery.getRoleName())){
            queryWrapper.like("role_name",merchantQuery.getRoleName());
        }
        if (!StringUtils.isEmpty(merchantQuery.getLevel()) && !"请选择".equals(merchantQuery.getLevel())){
            queryWrapper.eq("level",merchantQuery.getLevel());
        }
        if (!StringUtils.isEmpty(merchantQuery.getPhone())){
            queryWrapper.eq("phone",merchantQuery.getPhone());
        }
        return baseMapper.selectList(queryWrapper);
    }
}
