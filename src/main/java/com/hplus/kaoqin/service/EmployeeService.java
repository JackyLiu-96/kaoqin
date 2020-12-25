package com.hplus.kaoqin.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.hplus.kaoqin.entity.Employee;
import com.hplus.kaoqin.entity.Merchant;
import com.hplus.kaoqin.querry.EmployeeQuerry;

import java.util.List;
import java.util.Map;

public interface EmployeeService extends IService<Employee> {

    /**
     * 员工录入信息
     */
    int insertEmployee(Employee employee);

    int updateEmployee(Employee employee);

    List<Employee> selectQuery(QueryWrapper<Employee> queryWrapper, EmployeeQuerry employeeQuerry);
}
