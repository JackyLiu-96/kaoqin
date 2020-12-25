package com.hplus.kaoqin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hplus.kaoqin.entity.Shift;

import java.util.List;
import java.util.Map;

/**
 * @author LiuJiang
 * @date 2020/12/24 9:28
 */
public interface ShiftService extends IService<Shift> {

    /**
     * 条件查询
     * @param map
     * @return
     */
    List<Shift> selectByMap(Map map);

}
