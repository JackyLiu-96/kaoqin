package com.hplus.kaoqin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hplus.kaoqin.entity.Merchant;
import com.hplus.kaoqin.entity.Shift;
import com.hplus.kaoqin.mapper.MerchantMapper;
import com.hplus.kaoqin.mapper.ShiftMapper;
import com.hplus.kaoqin.service.MerchantService;
import com.hplus.kaoqin.service.ShiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


/**
 * @author LiuJiang
 * @date 2020/12/24 9:29
 */
@Service
public class ShiftServiceImpl extends ServiceImpl<ShiftMapper, Shift> implements ShiftService {

    @Autowired
    private ShiftMapper shiftMapper;

    /**
     * 条件查询
     *
     * @param map
     * @return
     */
    @Override
    public List<Shift> selectByMap(Map map) {
        return shiftMapper.selectByMap(map);
    }
}
