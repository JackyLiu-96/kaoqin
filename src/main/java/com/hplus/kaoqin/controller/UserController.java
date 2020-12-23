package com.hplus.kaoqin.controller;


import com.hplus.kaoqin.common.vo.R;
import com.hplus.kaoqin.entity.Employee;
import com.hplus.kaoqin.entity.Merchant;
import com.hplus.kaoqin.entity.User;
import com.hplus.kaoqin.mapper.EmployeeMapper;
import com.hplus.kaoqin.mapper.MerchantMapper;
import com.hplus.kaoqin.service.EmployeeService;
import com.hplus.kaoqin.service.UserService;
import com.hplus.kaoqin.util.MD5Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author jacky
 * @since 2020-12-23
 */
@RestController
@RequestMapping("/kq/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private MerchantMapper merchantMapper;

    @PostMapping("/login")
    public R login(@RequestParam String username,@RequestParam String password){
        User user = userService.findBynameAndPwd(username, MD5Utils.code(password));
        if(user == null){
            return R.error().message("用户名或密码错误");
        }
        return R.ok().data("user",user);
    }


    @PostMapping("/insertEmployee")
    public R insertEmployee (@RequestParam(value = "merchantName") String merchantName,
                             @RequestParam(value = "name") String name,
                             @RequestParam(value = "shift") String shift,
                             @RequestParam(value = "startTime") String startTime,
                             @RequestParam(value = "endTime") String endTime,
                             @RequestParam(value = "workHour") String workHour){
        Employee employee = new Employee();
        //查对应的供应商
        Map<String, Object> map = new HashMap<>();
        map.put("merchant_name",merchantName);
        List<Merchant> merchants = merchantMapper.selectByMap(map);
        if (merchants!=null && merchants.size()>0){
            employee.setMerchantId(merchants.get(0).getId());
        }
        employee.setCreateTime(new Date());
        employee.setMerchantName(merchantName);
        employee.setStartTime(startTime);
        employee.setEndTime(endTime);
        employee.setWorkHour(Double.valueOf(workHour));
        employee.setName(name);
        employee.setShift(shift);
        int flag =employeeService.insertEmployee(employee);
        if (flag==1){
            return R.ok().message("新增成功");
        }else {
            return R.error().message("新增失败");
        }
    }
}

