package com.hplus.kaoqin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.hplus.kaoqin.entity.Employee;
import com.hplus.kaoqin.mapper.EmployeeMapper;
import com.hplus.kaoqin.querry.EmployeeQuerry;
import com.hplus.kaoqin.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import java.util.List;


@Service
public class EmployeeServiceImpl extends ServiceImpl<EmployeeMapper, Employee> implements EmployeeService {

    @Autowired
    private EmployeeMapper employeeMapper;


    @Override
    public int insertEmployee(Employee employee) {
        return employeeMapper.insert(employee);
    }

    @Override
    public int updateEmployee(Employee employee) {
        return employeeMapper.updateById(employee);
    }

    @Override
    public List<Employee> selectQuery(QueryWrapper<Employee> queryWrapper, EmployeeQuerry employeeQuerry) {
        if (!StringUtils.isEmpty(employeeQuerry.getId())) {
            queryWrapper.eq("id", employeeQuerry.getId());
        }

        if (!StringUtils.isEmpty(employeeQuerry.getName())) {
            queryWrapper.like("name", employeeQuerry.getName());
        }

        if (!StringUtils.isEmpty(employeeQuerry.getMerchantName()) && !"请选择".equals(employeeQuerry.getMerchantName())) {
            queryWrapper.eq("merchant_name", employeeQuerry.getMerchantName());
        }

        if (!StringUtils.isEmpty(employeeQuerry.getShiftName())  && !"请选择".equals(employeeQuerry.getShiftName())) {
            queryWrapper.eq("shift_name", employeeQuerry.getShiftName());
        }

        if (!StringUtils.isEmpty(employeeQuerry.getStartTime())) {
            queryWrapper.ge("start_Time", employeeQuerry.getStartTime());
        }

        if (!StringUtils.isEmpty(employeeQuerry.getEndTime())) {
            queryWrapper.le("end_Time", employeeQuerry.getEndTime());
        }

        return baseMapper.selectList(queryWrapper);
    }


}
