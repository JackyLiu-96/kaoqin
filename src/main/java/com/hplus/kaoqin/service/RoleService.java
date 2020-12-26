package com.hplus.kaoqin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hplus.kaoqin.entity.Role;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @Author Wangxiang
 * @Date 2020/12/26 21:03
 */

public interface RoleService extends IService<Role> {

    /**
     * 查所有角色
     */
    List<Role> selectRole(Map map);
}
