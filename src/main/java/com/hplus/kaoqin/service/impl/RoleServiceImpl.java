package com.hplus.kaoqin.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hplus.kaoqin.entity.Role;
import com.hplus.kaoqin.mapper.RoleMapper;
import com.hplus.kaoqin.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @Author
 * @Date 2020/12/26 21:05
 */

@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper,Role> implements RoleService {

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public List<Role> selectRole(Map map) {
        return roleMapper.selectByMap(map);
    }
}
