package com.hplus.kaoqin.service.impl;


import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hplus.kaoqin.entity.User;
import com.hplus.kaoqin.mapper.UserMapper;
import com.hplus.kaoqin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author jacky
 * @since 2020-12-23
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User findBynameAndPwd(String username, String password) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("username", username);
        map.put("password", password);
        List<User> list = userMapper.selectByMap(map);
        if (list != null && list.size() > 0){
            return list.get(0);
        }
         return null;
    }
}
