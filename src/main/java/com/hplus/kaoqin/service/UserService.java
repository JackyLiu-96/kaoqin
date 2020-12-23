package com.hplus.kaoqin.service;

import com.baomidou.mybatisplus.extension.service.IService;
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

    User findBynameAndPwd(String username, String password);
}
