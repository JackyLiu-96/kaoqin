package com.hplus.kaoqin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hplus.kaoqin.entity.Merchant;
import com.hplus.kaoqin.mapper.MerchantMapper;
import com.hplus.kaoqin.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<Merchant> getMerchantList() {
        return merchantMapper.selectList(null);
    }
}
