package com.hplus.kaoqin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.hplus.kaoqin.entity.Employee;
import com.hplus.kaoqin.entity.User;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author jacky
 * @since 2020-12-23
 */
public interface UserService extends IService<User> {

    /**
     * 查询账号密码
     * @param username
     * @param password
     * @return
     */
    User findBynameAndPwd(String username, String password);


}
